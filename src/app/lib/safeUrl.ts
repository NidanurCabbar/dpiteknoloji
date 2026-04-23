/**
 * URL güvenlik yardımcıları.
 *
 * Sosyal medya gibi kullanıcı kontrollü alanlara `javascript:`, `data:` ya da
 * `file:` gibi tehlikeli şema girilmesini engellemek için kullanılır.
 */

const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Verilen string güvenli bir HTTP(S) URL ise kendisini döner, aksi halde boş
 * string. Render tarafında son savunma hattı olarak kullanılır.
 */
export function safeHttpUrl(value: string | undefined | null): string {
  if (!value) return "";
  const trimmed = String(value).trim();
  if (!trimmed) return "";
  try {
    const u = new URL(trimmed);
    if (u.protocol === "http:" || u.protocol === "https:") return trimmed;
    return "";
  } catch {
    return "";
  }
}

/**
 * Admin kayıt aşamasında kullanılır. Geçerli http/https/mailto/tel ise true.
 * Boş değere izin verir (kullanıcı alanı silmiş olabilir).
 */
export function isAllowedLink(value: string): boolean {
  const v = value.trim();
  if (!v) return true;
  try {
    const u = new URL(v);
    return SAFE_PROTOCOLS.has(u.protocol);
  } catch {
    return false;
  }
}
