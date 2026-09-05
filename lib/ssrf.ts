/**
 * Shared server-side URL fetcher used by the link inspection features
 * (document preview, webhook tester). Forwards caller-supplied headers so
 * internal resources that require a service token can be checked during
 * the intranet migration.
 */

export interface FetchResult {
  url: string;
  status: number;
  contentType: string;
  /** Truncated text (first ~4000 chars). Binary becomes a placeholder. */
  content: string;
}

export function resolveTarget(raw: string, base: string): URL | null {
  const value = raw.trim();
  if (!value) return null;
  const lowered = value.toLowerCase();
  if (
    lowered.startsWith("file:") ||
    lowered.startsWith("data:") ||
    lowered.startsWith("gopher:") ||
    lowered.startsWith("ftp:")
  ) {
    return null;
  }
  try {
    const url = value.startsWith("/") ? new URL(value, base) : new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

export async function fetchUrl(
  target: URL,
  extraHeaders: Record<string, string> = {},
): Promise<FetchResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(target.toString(), {
      headers: {
        "User-Agent": "AcmeLinkChecker/1.4 (migration)",
        ...extraHeaders,
      },
      redirect: "follow",
      signal: controller.signal,
    });
    const contentType = res.headers.get("content-type") ?? "";
    let content: string;
    if (contentType.includes("json") || contentType.includes("text") || !contentType) {
      content = (await res.text()).slice(0, 4000);
    } else {
      content = `[non-text content: ${contentType}]`;
    }
    return {
      url: target.toString(),
      status: res.status,
      contentType,
      content,
    };
  } finally {
    clearTimeout(timer);
  }
}

export function requestBase(request: Request): string {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "localhost:3000";
  const proto =
    request.headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}
