// Unrestricted hosts: the agent has to read project docs sites, not only GitHub.
// eve's own SSRF checks still apply to every request and redirect.
export { default } from "eve/tools/web_fetch";
