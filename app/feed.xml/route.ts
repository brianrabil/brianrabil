import assert from "node:assert";
import * as cheerio from "cheerio";
import { Feed } from "feed";
import * as fs from "node:fs";
import * as path from "node:path";
import { glob } from "glob";
import { appConfig } from "@/lib/app-config";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function GET(req: Request) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    throw Error("Missing NEXT_PUBLIC_SITE_URL environment variable");
  }

  const author = {
    name: appConfig.fullName,
    email: appConfig.email,
  };

  const feed = new Feed({
    title: appConfig.title,
    description: appConfig.description,
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  });

  // Get article files from the file system
  const articles = await glob("**/*.mdx", {
    cwd: path.join(__dirname, "../articles"),
  });

  const articleIds = articles.map((article) => article.replace(/\.mdx$/, ""));

  for (const id of articleIds) {
    const url = String(new URL(`/articles/${id}`, req.url));
    const html = await (await fetch(url)).text();
    const $ = cheerio.load(html);

    const publicUrl = `${siteUrl}/articles/${id}`;
    const article = $("article").first();
    const title = article.find("h1").first().text();
    const date = article.find("time").first().attr("datetime");
    const content = article.find("[data-mdx-content]").first().html();

    assert(typeof title === "string");
    assert(typeof date === "string");
    assert(typeof content === "string");

    feed.addItem({
      title,
      id: publicUrl,
      link: publicUrl,
      content,
      author: [author],
      contributor: [author],
      date: new Date(date),
    });
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      "content-type": "application/xml",
      "cache-control": "s-maxage=31556952",
    },
  });
}
