/**
 * Posting replay. Plans one loop of a simulated Hyperpost posting fleet from a
 * fixed seed and answers what the four agent lanes show at any replay time.
 * Input: a seed. Output: every post as a timeline row of stage attempts
 * (draft, review, scheduled, then a publish or a failure), the featured posts
 * the lanes write by hand, and the publish and failure log. The loop repeats
 * seamlessly: posts near the end spill into the next loop's start, and rows
 * are checked across that seam.
 *
 * Owns the failure where the timeline would fire faster than anyone can
 * follow: post starts and publishes per second are capped while planning and
 * checked again once the plan is built.
 */

// ---------------------------------------------------------------- limits

/** Posts starting in any one second of replay, featured and background together. */
export const MAX_POSTS_PER_SECOND = 16;
/** Publishes (muzzle flashes) in any one second of replay. */
export const MAX_PUBLISHES_PER_SECOND = 16;
/** Draft, two review attempts, scheduled. */
export const MAX_SEGMENTS_PER_POST = 4;
/** The ceiling on bars entering the timeline per second. */
export const MAX_BARS_PER_SECOND = MAX_POSTS_PER_SECOND * MAX_SEGMENTS_PER_POST;
/** Timeline rows. Posts reuse a row once its last post has cooled down. */
export const MAX_ROWS = 24;
/** Posts in one loop; generation stops here even if the loop is not full. */
const MAX_POSTS_PER_LOOP = 512;

/** The mean rate of background posts; the gaps are random, so fire comes in bursts. */
const BACKGROUND_POSTS_PER_SECOND = 12;
/** Featured posts start at most once a second, so background takes the rest. */
const FEATURED_POSTS_PER_SECOND = 1;
const MIN_BACKGROUND_SPACING_S =
	1 / (MAX_POSTS_PER_SECOND - FEATURED_POSTS_PER_SECOND);
/** A row stays empty this long after its post ends, so posts read as separate. */
const ROW_COOLDOWN_S = 0.6;

/** Lane typing speed: fast, still readable a word at a time. */
export const TYPE_CHARS_PER_S = 45;
/** The finished line holds this long before it is sent on. */
const TYPE_HOLD_S = 0.3;
/** The writer's pause between posts. */
const WRITER_GAP_S = 0.35;
const REVIEW_S = 0.9;
const RETRY_FIRST_ATTEMPT_S = 0.45;
const RETRY_BACKOFF_S = 0.3;
const RETRY_SECOND_ATTEMPT_S = 0.55;
/** How long the publisher lane shows a fleet failure before it moves on. */
const FAILURE_SHOWN_S = 0.9;

const BACKGROUND_RETRY_CHANCE = 0.08;
const BACKGROUND_FAILURE_CHANCE = 0.045;
const BACKGROUND_DRAFT_S = [0.18, 0.5] as const;
const BACKGROUND_REVIEW_S = [0.08, 0.22] as const;
const BACKGROUND_BACKOFF_S = [0.06, 0.16] as const;
const BACKGROUND_SCHEDULED_S = [0.1, 0.3] as const;

export const REPLAY_SEED = 0x2026_1005;

/**
 * Loop copies to look through, in loops. A post can end up to one loop after
 * the loop starts, so two loops back always reaches a finished one.
 */
const LOOP_SHIFTS = [0, -1, -2] as const;

/** The posts the lanes write. Short, generic, small-business posts. */
const FEATURED_SOURCES: readonly FeaturedSource[] = [
	{
		text: "Online booking now shows open times for the next two weeks.",
		channel: "blog",
		slot: "Tue 9:00 am",
		retry_reason: null,
	},
	{
		text: "How to repot a snake plant in four steps, with the soil mix we use.",
		channel: "newsletter",
		slot: "Wed 7:30 am",
		retry_reason: null,
	},
	{
		text: "Free knife sharpening at the shop on Saturday, 10 am to 2 pm.",
		channel: "social",
		slot: "Thu 12:00 pm",
		retry_reason: null,
	},
	{
		text: "We now open at 8 am on weekdays. Weekend hours stay the same.",
		channel: "social",
		slot: "Fri 8:00 am",
		retry_reason: "Link check timed out. Trying again.",
	},
	{
		text: "How to read the care label on a wool sweater before washing it.",
		channel: "blog",
		slot: "Mon 10:00 am",
		retry_reason: null,
	},
	{
		text: "The spring menu starts Thursday: three new soups and a lentil salad.",
		channel: "newsletter",
		slot: "Tue 6:00 pm",
		retry_reason: null,
	},
	{
		text: "Order by Friday noon for weekend pickup. Delivery days are unchanged.",
		channel: "social",
		slot: "Wed 9:30 am",
		retry_reason: null,
	},
	{
		text: "How we pack fragile orders, and what to do if one arrives broken.",
		channel: "blog",
		slot: "Thu 2:00 pm",
		retry_reason: "Image upload failed. Trying again.",
	},
	{
		text: "Beginner bike repair class on May 18, 6 to 8 pm. Tools provided.",
		channel: "newsletter",
		slot: "Fri 11:00 am",
		retry_reason: null,
	},
	{
		text: "Gift cards now work on the website as well as in the store.",
		channel: "social",
		slot: "Sat 9:00 am",
		retry_reason: null,
	},
];

/** Lanes, top to bottom. */
export const LANE_ROLES = [
	"Writer",
	"Editor",
	"Scheduler",
	"Publisher",
] as const;

/** Glyph frames per action, every frame GLYPH_COLUMNS wide so the cell never shifts. */
export const GLYPH_COLUMNS = 9;
export const GLYPH_FRAMES_PER_S = 4;
const GLYPHS = {
	drafting: ["(•ᴗ•)✎▁  ", "(•ᴗ•)✎▁▂ ", "(•ᴗ•)✎▁▂▃", "(•ᴗ•)✎   "],
	reviewing: ["(¬_¬)⌕   ", "(¬_¬) ⌕  ", "(¬_¬)  ⌕ ", "(¬_¬)   ⌕"],
	retrying: ["(°o°) ↻  ", "(°o°)  ↻ "],
	scheduling: ["(•_•) ◴  ", "(•_•) ◷  ", "(•_•) ◶  ", "(•_•) ◵  "],
	publishing: ["(^_^)/ ✓ ", "(^_^)/ ✓·", "(^_^)  ✓·"],
	failed: ["(×_×)    ", "(×_×) .  "],
	waiting: ["(-_-) .  ", "(-_-) .. ", "(-_-) ..z", "(-_-)  zZ"],
} as const satisfies Record<string, readonly string[]>;

// ---------------------------------------------------------------- types

/** One featured post as written, before timing. */
type FeaturedSource = {
	text: string;
	channel: string;
	slot: string;
	retry_reason: string | null;
};

export type Stage = "draft" | "review" | "scheduled";
/** How an attempt ended: passed on, retried after a backoff, or failed for good. */
export type Outcome = "done" | "retried" | "failed";

/** One attempt of one stage, in replay seconds within the loop. */
export type Segment = {
	stage: Stage;
	start_s: number;
	end_s: number;
	outcome: Outcome;
};

/** A post before it has a row. */
type PostTiming = {
	segments: readonly Segment[];
	start_s: number;
	end_s: number;
	/** Null when the post failed instead. */
	published_at_s: number | null;
	featured_index: number | null;
};

/** The featured chain: the lanes' posts, timed, and the loop length they set. */
type FeaturedPlan = {
	loop_s: number;
	posts: readonly FeaturedPost[];
	timings: readonly PostTiming[];
};

export type FeaturedPost = FeaturedSource & {
	draft: Segment;
	review: readonly Segment[];
	scheduled: Segment;
	published_at_s: number;
};

/** Every timed post, featured first, before rows are assigned. */
type TimedPosts = {
	featured: FeaturedPlan;
	background: readonly PostTiming[];
	dropped_for_rate: number;
};

/** A post on its timeline row. */
export type Post = PostTiming & { row: number };

/** One publish or failure, for the publisher's streak. */
export type Outcomes = { at_s: number; is_published: boolean };

/** The finished, checked replay. */
export type ReplayPlan = {
	loop_s: number;
	rows: number;
	posts: readonly Post[];
	featured: readonly FeaturedPost[];
	outcomes: readonly Outcomes[];
	dropped_for_rate: number;
	dropped_for_rows: number;
};

/** What one lane shows. */
export type LaneState = {
	glyph: string;
	action: string;
	text: string;
	is_typing: boolean;
	is_idle: boolean;
	combo: number;
};

// ---------------------------------------------------------------- pipeline

export function planPostingReplay(seed: number): ReplayPlan {
	const featured = planFeatured(FEATURED_SOURCES);
	const timed = planBackground(seed, featured);
	const placed = placeRows(seed, timed);
	return verifyReplay(placed);
}

// ---------------------------------------------------------------- stages

/**
 * Times the featured chain. The writer drafts each post back to back; the
 * editor reviews a post as soon as its draft is sent, then the scheduler
 * schedules it and it publishes. The loop is exactly one pass of the writer.
 */
function planFeatured(sources: readonly FeaturedSource[]): FeaturedPlan {
	assert(sources.length >= 2, "the featured chain needs at least two posts");
	assert(
		sources.length <= MAX_POSTS_PER_LOOP,
		"featured posts fit in one loop",
	);

	const posts: FeaturedPost[] = [];
	let cursor_s = 0;
	for (const source of sources) {
		const draft_s = source.text.length / TYPE_CHARS_PER_S + TYPE_HOLD_S;
		const draft: Segment = {
			stage: "draft",
			start_s: cursor_s,
			end_s: cursor_s + draft_s,
			outcome: "done",
		};
		const review = timeReview(draft.end_s, source.retry_reason !== null);
		const review_end_s = review[review.length - 1]?.end_s ?? draft.end_s;
		const scheduled_s =
			`${source.slot} · ${source.channel}`.length / TYPE_CHARS_PER_S +
			TYPE_HOLD_S;
		const scheduled: Segment = {
			stage: "scheduled",
			start_s: review_end_s,
			end_s: review_end_s + scheduled_s,
			outcome: "done",
		};
		posts.push({
			...source,
			draft,
			review,
			scheduled,
			published_at_s: scheduled.end_s,
		});
		cursor_s = draft.end_s + WRITER_GAP_S;
	}
	const loop_s = cursor_s;

	// Each lane holds one post at a time, across the loop seam too.
	for (let index = 0; index < posts.length; index += 1) {
		const post = posts[index];
		const next = posts[(index + 1) % posts.length];
		assert(post !== undefined && next !== undefined, "neighbours exist");
		const wrap_s = index + 1 === posts.length ? loop_s : 0;
		assert(
			(post.review[post.review.length - 1]?.end_s ?? 0) <=
				(next.review[0]?.start_s ?? 0) + wrap_s,
			"the editor reviews one post at a time",
		);
		assert(
			post.scheduled.end_s <= next.scheduled.start_s + wrap_s,
			"the scheduler schedules one post at a time",
		);
		assert(
			next.draft.start_s + wrap_s - post.draft.start_s >=
				1 / FEATURED_POSTS_PER_SECOND,
			"featured posts start at most once a second",
		);
	}

	const timings = posts.map(
		(post, index): PostTiming => ({
			segments: [post.draft, ...post.review, post.scheduled],
			start_s: post.draft.start_s,
			end_s: post.scheduled.end_s,
			published_at_s: post.published_at_s,
			featured_index: index,
		}),
	);
	assert(loop_s > 0, "the loop has length");
	assert(timings.length === sources.length, "every source is timed");
	return { loop_s, posts, timings };
}

/**
 * Times the rest of the fleet across the loop. Gaps between starts are random
 * with a floor, so fire comes in bursts but never above the cap; a post whose
 * publish would crowd the publish cap is dropped and counted.
 */
function planBackground(seed: number, featured: FeaturedPlan): TimedPosts {
	assert(featured.loop_s > 1, "the loop is longer than a second");
	assert(BACKGROUND_POSTS_PER_SECOND < MAX_POSTS_PER_SECOND, "mean under cap");

	const random = seededRandom(seed);
	const range = (bounds: readonly [number, number]) =>
		bounds[0] + random() * (bounds[1] - bounds[0]);
	const publishes: number[] = featured.timings.flatMap((timing) =>
		timing.published_at_s === null ? [] : [timing.published_at_s],
	);
	const background: PostTiming[] = [];
	let dropped_for_rate = 0;
	let cursor_s = 0;

	while (
		background.length + featured.timings.length < MAX_POSTS_PER_LOOP &&
		cursor_s < featured.loop_s
	) {
		const gap_s = -Math.log(1 - random()) / BACKGROUND_POSTS_PER_SECOND;
		cursor_s += Math.max(MIN_BACKGROUND_SPACING_S, gap_s);
		if (cursor_s >= featured.loop_s) break;

		const segments: Segment[] = [];
		const draft_end_s = cursor_s + range(BACKGROUND_DRAFT_S);
		segments.push({
			stage: "draft",
			start_s: cursor_s,
			end_s: draft_end_s,
			outcome: "done",
		});
		let review_end_s = draft_end_s + range(BACKGROUND_REVIEW_S);
		if (random() < BACKGROUND_RETRY_CHANCE) {
			segments.push({
				stage: "review",
				start_s: draft_end_s,
				end_s: review_end_s,
				outcome: "retried",
			});
			const retry_start_s = review_end_s + range(BACKGROUND_BACKOFF_S);
			review_end_s = retry_start_s + range(BACKGROUND_REVIEW_S);
			segments.push({
				stage: "review",
				start_s: retry_start_s,
				end_s: review_end_s,
				outcome: "done",
			});
		} else {
			segments.push({
				stage: "review",
				start_s: draft_end_s,
				end_s: review_end_s,
				outcome: "done",
			});
		}
		const is_failed = random() < BACKGROUND_FAILURE_CHANCE;
		const scheduled_end_s = review_end_s + range(BACKGROUND_SCHEDULED_S);
		segments.push({
			stage: "scheduled",
			start_s: review_end_s,
			end_s: scheduled_end_s,
			outcome: is_failed ? "failed" : "done",
		});
		assert(segments.length <= MAX_SEGMENTS_PER_POST, "segments per post");

		if (
			!is_failed &&
			peakWithCandidate(publishes, scheduled_end_s, featured.loop_s) >
				MAX_PUBLISHES_PER_SECOND
		) {
			dropped_for_rate += 1;
			continue;
		}
		if (!is_failed) publishes.push(scheduled_end_s);
		background.push({
			segments,
			start_s: cursor_s,
			end_s: scheduled_end_s,
			published_at_s: is_failed ? null : scheduled_end_s,
			featured_index: null,
		});
	}

	assert(
		background.length + featured.timings.length <= MAX_POSTS_PER_LOOP,
		"posts per loop stay under the cap",
	);
	assert(
		background.every((post, index) => {
			const previous = background[index - 1];
			return !previous || post.start_s > previous.start_s;
		}),
		"background posts are in start order",
	);
	return { featured, background, dropped_for_rate };
}

/**
 * Puts every post on a row. Featured posts go first so they always get one; a
 * background post with no free row is dropped and counted. A row is free when
 * the post clears every post already on it by the cooldown, including the
 * copies one loop before and after.
 */
function placeRows(seed: number, timed: TimedPosts): ReplayPlan {
	assert(MAX_ROWS > 0, "there are rows");
	assert(timed.featured.timings.length < MAX_ROWS * 4, "featured posts fit");

	const random = seededRandom(seed ^ 0x9e37_79b9);
	const loop_s = timed.featured.loop_s;
	const taken: { start_s: number; end_s: number }[][] = Array.from(
		{ length: MAX_ROWS },
		() => [],
	);
	const posts: Post[] = [];
	let dropped_for_rows = 0;

	const isFree = (row: number, timing: PostTiming) => {
		for (const other of taken[row] ?? []) {
			for (const shift_s of [-loop_s, 0, loop_s]) {
				const clears_before =
					timing.end_s + ROW_COOLDOWN_S <= other.start_s + shift_s;
				const clears_after =
					other.end_s + shift_s + ROW_COOLDOWN_S <= timing.start_s;
				if (!clears_before && !clears_after) return false;
			}
		}
		return true;
	};

	const place = (timing: PostTiming) => {
		const first_row = Math.floor(random() * MAX_ROWS);
		for (let offset = 0; offset < MAX_ROWS; offset += 1) {
			const row = (first_row + offset) % MAX_ROWS;
			if (!isFree(row, timing)) continue;
			taken[row]?.push({ start_s: timing.start_s, end_s: timing.end_s });
			posts.push({ ...timing, row });
			return true;
		}
		return false;
	};

	for (const timing of timed.featured.timings) {
		assert(place(timing), "every featured post gets a row");
	}
	for (const timing of timed.background) {
		if (!place(timing)) dropped_for_rows += 1;
	}
	posts.sort((a, b) => a.start_s - b.start_s);

	const outcomes = posts
		.map(
			(post): Outcomes => ({
				at_s: post.published_at_s ?? post.end_s,
				is_published: post.published_at_s !== null,
			}),
		)
		.sort((a, b) => a.at_s - b.at_s);

	assert(
		posts.length + dropped_for_rows ===
			timed.featured.timings.length + timed.background.length,
		"placing keeps or counts every post",
	);
	return {
		loop_s,
		rows: MAX_ROWS,
		posts,
		featured: timed.featured.posts,
		outcomes,
		dropped_for_rate: timed.dropped_for_rate,
		dropped_for_rows,
	};
}

/** Checks the finished plan against every limit before anything draws it. */
function verifyReplay(plan: ReplayPlan): ReplayPlan {
	assert(plan.posts.length > 0, "the plan has posts");
	assert(plan.posts.length <= MAX_POSTS_PER_LOOP, "posts per loop");

	const starts = plan.posts.map((post) => post.start_s);
	const publishes = plan.outcomes
		.filter((outcome) => outcome.is_published)
		.map((outcome) => outcome.at_s);
	assert(
		peakPerSecond(starts, plan.loop_s) <= MAX_POSTS_PER_SECOND,
		`at most ${MAX_POSTS_PER_SECOND} posts start in any second`,
	);
	assert(
		peakPerSecond(publishes, plan.loop_s) <= MAX_PUBLISHES_PER_SECOND,
		`at most ${MAX_PUBLISHES_PER_SECOND} posts publish in any second`,
	);
	assert(
		plan.outcomes.some((outcome) => !outcome.is_published),
		"each loop has a failure, so the streak resets",
	);
	for (const post of plan.posts) {
		assert(post.row >= 0 && post.row < plan.rows, "posts sit on a row");
		assert(post.segments.length <= MAX_SEGMENTS_PER_POST, "segments per post");
		assert(post.end_s - post.start_s < plan.loop_s, "a post fits in a loop");
		for (const segment of post.segments) {
			assert(segment.end_s > segment.start_s, "segments have length");
		}
	}
	return plan;
}

// ---------------------------------------------------------------- lanes

/**
 * What the four lanes show at `replay_s`. A still frame shows every line
 * typed out in full. Pure: the same time gives the same lanes.
 */
export function laneStatesAt(
	plan: ReplayPlan,
	replay_s: number,
	is_still: boolean,
): readonly LaneState[] {
	assert(Number.isFinite(replay_s), "replay time is a number");
	assert(plan.featured.length > 0, "the lanes have posts");

	const local_s = positiveModulo(replay_s, plan.loop_s);
	// A post's times can spill past the loop end, so also look one loop back.
	const times = [local_s, local_s + plan.loop_s];
	const frame = is_still ? 0 : Math.floor(replay_s * GLYPH_FRAMES_PER_S);
	const glyph = (action: keyof typeof GLYPHS) => {
		const frames: readonly string[] = GLYPHS[action];
		return frames[frame % frames.length] ?? frames[0] ?? "";
	};
	const typed = (text: string, since_s: number) => {
		if (is_still) return { text, is_typing: false };
		const count = Math.min(text.length, Math.floor(since_s * TYPE_CHARS_PER_S));
		return { text: text.slice(0, count), is_typing: count < text.length };
	};
	// The post whose `endOf` passed most recently, looking back through loop copies.
	const latest = (endOf: (post: FeaturedPost) => number) => {
		let best: FeaturedPost | null = null;
		let best_s = Number.NEGATIVE_INFINITY;
		for (const shift_s of LOOP_SHIFTS) {
			for (const post of plan.featured) {
				const end_s = endOf(post) + shift_s * plan.loop_s;
				if (end_s > local_s || end_s <= best_s) continue;
				best = post;
				best_s = end_s;
			}
		}
		assert(best !== null, "some post has always finished each stage");
		return best;
	};
	const covering = (
		startOf: (post: FeaturedPost) => number,
		endOf: (post: FeaturedPost) => number,
	) => {
		for (const time_s of times) {
			for (const post of plan.featured) {
				if (startOf(post) <= time_s && time_s < endOf(post)) {
					return { post, since_s: time_s - startOf(post), time_s };
				}
			}
		}
		return null;
	};

	// Writer: types the draft, then rests until the next one.
	const writing = covering(
		(post) => post.draft.start_s,
		(post) => post.draft.end_s,
	);
	const writer: LaneState = writing
		? {
				glyph: glyph("drafting"),
				action: "drafting",
				...typed(writing.post.text, writing.since_s),
				is_idle: false,
				combo: 0,
			}
		: {
				glyph: glyph("waiting"),
				action: "sent to review",
				text: latest((post) => post.draft.end_s)?.text ?? "",
				is_typing: false,
				is_idle: true,
				combo: 0,
			};

	// Editor: reviews, and backs off between attempts when a check fails.
	const reviewing = covering(
		(post) => post.review[0]?.start_s ?? 0,
		(post) => post.review[post.review.length - 1]?.end_s ?? 0,
	);
	let editor: LaneState = {
		glyph: glyph("waiting"),
		action: "waiting",
		text:
			latest((post) => post.review[post.review.length - 1]?.end_s ?? 0)?.text ??
			"",
		is_typing: false,
		is_idle: true,
		combo: 0,
	};
	if (reviewing) {
		const in_backoff = reviewing.post.review.some((attempt, index) => {
			const next = reviewing.post.review[index + 1];
			return (
				attempt.outcome === "retried" &&
				next !== undefined &&
				attempt.end_s <= reviewing.time_s &&
				reviewing.time_s < next.start_s
			);
		});
		editor = {
			glyph: glyph(in_backoff ? "retrying" : "reviewing"),
			action: in_backoff ? "retrying" : "reviewing",
			text:
				in_backoff && reviewing.post.retry_reason
					? reviewing.post.retry_reason
					: reviewing.post.text,
			is_typing: false,
			is_idle: false,
			combo: 0,
		};
	}

	// Scheduler: types the slot and channel.
	const scheduling = covering(
		(post) => post.scheduled.start_s,
		(post) => post.scheduled.end_s,
	);
	const last_scheduled = latest((post) => post.scheduled.end_s);
	const scheduler: LaneState = scheduling
		? {
				glyph: glyph("scheduling"),
				action: "scheduling",
				...typed(
					`${scheduling.post.slot} · ${scheduling.post.channel}`,
					scheduling.since_s,
				),
				is_idle: false,
				combo: 0,
			}
		: {
				glyph: glyph("waiting"),
				action: "scheduled",
				text: last_scheduled
					? `${last_scheduled.slot} · ${last_scheduled.channel}`
					: "",
				is_typing: false,
				is_idle: true,
				combo: 0,
			};

	// Publisher: posts the whole fleet; the streak counts publishes since the last failure.
	const streak = streakAt(plan, local_s);
	const last_published = latest((post) => post.published_at_s);
	const publisher: LaneState =
		streak.failed_ago_s < FAILURE_SHOWN_S
			? {
					glyph: glyph("failed"),
					action: "failed",
					text: "A post failed to publish.",
					is_typing: false,
					is_idle: false,
					combo: 0,
				}
			: {
					glyph: glyph("publishing"),
					action: last_published
						? `published · ${last_published.channel}`
						: "publishing",
					text: last_published?.text ?? "",
					is_typing: false,
					is_idle: false,
					combo: streak.count,
				};

	const lanes = [writer, editor, scheduler, publisher];
	assert(lanes.length === LANE_ROLES.length, "one state per lane");
	assert(
		lanes.every((lane) => [...lane.glyph].length === GLYPH_COLUMNS),
		"glyph frames keep their width",
	);
	return lanes;
}

/** Publishes since the last failure, and how long ago that failure was. */
function streakAt(plan: ReplayPlan, local_s: number) {
	let failed_at_s = Number.NEGATIVE_INFINITY;
	for (const outcome of plan.outcomes) {
		if (outcome.is_published) continue;
		for (const shift_s of LOOP_SHIFTS) {
			const at_s = outcome.at_s + shift_s * plan.loop_s;
			if (at_s <= local_s) failed_at_s = Math.max(failed_at_s, at_s);
		}
	}
	// Every loop has a failure, so the window is under a loop and counts each publish once.
	assert(local_s - failed_at_s < plan.loop_s, "a failure within the last loop");
	let count = 0;
	for (const outcome of plan.outcomes) {
		if (!outcome.is_published) continue;
		for (const shift_s of LOOP_SHIFTS) {
			const at_s = outcome.at_s + shift_s * plan.loop_s;
			if (at_s > failed_at_s && at_s <= local_s) count += 1;
		}
	}
	return { count, failed_ago_s: local_s - failed_at_s };
}

// ---------------------------------------------------------------- helpers

/** Review attempts after a draft: one pass, or a failed check, a backoff, and a pass. */
function timeReview(start_s: number, has_retry: boolean): Segment[] {
	if (!has_retry) {
		return [
			{ stage: "review", start_s, end_s: start_s + REVIEW_S, outcome: "done" },
		];
	}
	const first_end_s = start_s + RETRY_FIRST_ATTEMPT_S;
	const second_start_s = first_end_s + RETRY_BACKOFF_S;
	return [
		{ stage: "review", start_s, end_s: first_end_s, outcome: "retried" },
		{
			stage: "review",
			start_s: second_start_s,
			end_s: second_start_s + RETRY_SECOND_ATTEMPT_S,
			outcome: "done",
		},
	];
}

/**
 * The most events in any half-open one-second window that holds `at_s`, counting
 * `at_s` itself: the same windows verifyReplay checks, so planning never
 * admits what verifying would reject.
 */
function peakWithCandidate(
	times: readonly number[],
	at_s: number,
	loop_s: number,
) {
	// Signed offsets of the neighbours within a second, around the loop.
	const offsets: number[] = [];
	for (const time_s of times) {
		const offset_s =
			positiveModulo(time_s - at_s + loop_s / 2, loop_s) - loop_s / 2;
		if (Math.abs(offset_s) < 1) offsets.push(offset_s);
	}
	let peak = 0;
	for (const from_s of [0, ...offsets.filter((offset_s) => offset_s <= 0)]) {
		let count = 1;
		for (const offset_s of offsets) {
			if (offset_s >= from_s && offset_s < from_s + 1) count += 1;
		}
		peak = Math.max(peak, count);
	}
	return peak;
}

/** The most events in any half-open one-second window, around the loop. */
function peakPerSecond(times: readonly number[], loop_s: number) {
	let peak = 0;
	for (const from_s of times) {
		let count = 0;
		for (const time_s of times) {
			const after_s = positiveModulo(time_s - from_s, loop_s);
			if (after_s < 1) count += 1;
		}
		peak = Math.max(peak, count);
	}
	return peak;
}

function positiveModulo(value: number, modulus: number) {
	return ((value % modulus) + modulus) % modulus;
}

/** mulberry32: small, fast, and the same on every machine. */
function seededRandom(seed: number) {
	let state = seed >>> 0;
	return () => {
		state = (state + 0x6d2b79f5) >>> 0;
		let value = state;
		value = Math.imul(value ^ (value >>> 15), value | 1);
		value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
		return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
	};
}

export function assert(condition: unknown, message: string): asserts condition {
	if (!condition) throw new Error(`posting replay: ${message}`);
}
