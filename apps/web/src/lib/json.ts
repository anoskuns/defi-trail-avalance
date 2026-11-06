/**
 * Safe JSON parser utility
 * Defensively handles null, undefined, literal "undefined", "null", "[object Object]",
 * empty strings, and malformed JSON syntax without throwing runtime exceptions.
 */
export function parseSafeJSON<T = any>(
  val: string | null | undefined,
  fallback: T | null = null
): T | null {
  if (
    !val ||
    val === "undefined" ||
    val === "null" ||
    val === "[object Object]" ||
    (typeof val === "string" && val.trim() === "")
  ) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(val);
    return (parsed !== undefined ? parsed : fallback) as T;
  } catch {
    return fallback;
  }
}

