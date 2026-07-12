/**
 * Helpers for turning an editable Instagram handle into the links the site needs.
 *
 * The admin stores a plain username (e.g. "accendoworld"). We defensively accept
 * a pasted "@handle" or a full profile URL and reduce it back to the username.
 */

/** Reduce whatever the editor pasted to a bare username, or "" if unusable. */
export function normalizeHandle(raw: string | null | undefined): string {
  if (!raw) return "";
  let h = raw.trim();
  if (!h) return "";

  // Strip a full URL down to the first path segment.
  const urlMatch = h.match(/instagram\.com\/([^/?#]+)/i);
  if (urlMatch) h = urlMatch[1];

  // Strip leading @ and any stray slashes/spaces.
  h = h.replace(/^@+/, "").replace(/[/\s]/g, "");
  return h;
}

/** Public web profile URL, e.g. https://www.instagram.com/accendoworld */
export function instagramWebUrl(handle: string | null | undefined): string {
  const h = normalizeHandle(handle);
  return h ? `https://www.instagram.com/${h}` : "";
}

/** Native app deep link that opens the profile in the Instagram mobile app. */
export function instagramAppUrl(handle: string | null | undefined): string {
  const h = normalizeHandle(handle);
  return h ? `instagram://user?username=${h}` : "";
}

/**
 * The effective profile URL to show around the site: an explicit override URL
 * (if the editor set one) wins, otherwise it is built from the handle.
 * Returns "" when nothing usable is configured.
 */
export function resolveInstagramUrl(
  handle: string | null | undefined,
  overrideUrl: string | null | undefined
): string {
  if (overrideUrl && overrideUrl.trim() && overrideUrl.trim() !== "#") {
    return overrideUrl.trim();
  }
  return instagramWebUrl(handle);
}
