import { localDev, vercelOidc } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";

// The agent has no public chat surface. Scheduled runs need no channel auth;
// these let the eve TUI, `eve remote`, and `eve dev` on localhost reach it.
export default eveChannel({
	auth: [vercelOidc(), localDev()],
});
