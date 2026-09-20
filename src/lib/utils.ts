/**
 * Ensures a URL string has a protocol, defaulting to `https://` when missing.
 *
 * `profile.yaml` stores social/contact handles as bare domains
 * (e.g. "github.com/foo") since some consumers (like the Typst resume
 * template) prepend their own protocol. The website renders these directly
 * as `<a href>` targets, which need an absolute URL to link off-site instead
 * of resolving relative to the current page.
 */
export function ensureProtocol(url: string): string {
	if (!url) return url;
	return /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url) ? url : `https://${url}`;
}
