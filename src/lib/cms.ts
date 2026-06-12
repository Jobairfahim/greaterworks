export type CmsRecord = Record<string, unknown>;

export interface CmsImage {
  url?: string;
  alternativeText?: string | null;
  formats?: Record<string, { url?: string } | undefined>;
}

export const isRecord = (value: unknown): value is CmsRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const safeRecord = (value: unknown): CmsRecord =>
  (isRecord(value) ? value : {}) as CmsRecord;

export const safeArray = <T = CmsRecord>(value: unknown): T[] =>
  Array.isArray(value) ? value.filter((item): item is T => isRecord(item)) : [];

export const pickString = (
  source: CmsRecord,
  keys: string[],
  fallback = ""
): string => {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return fallback;
};

export const pickNumber = (
  source: CmsRecord,
  keys: string[],
  fallback = 0
): number => {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
      return Number(value);
    }
  }
  return fallback;
};

export const resolveImageUrl = (image: unknown, fallback: string): string => {
  if (!isRecord(image)) return fallback;

  const cmsImage = image as CmsImage;
  const url =
    cmsImage.formats?.large?.url ||
    cmsImage.formats?.medium?.url ||
    cmsImage.formats?.small?.url ||
    cmsImage.url;

  if (!url) return fallback;
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `${process.env.NEXT_PUBLIC_SERVER_URL ?? ""}${url}`;
};

export const getString = pickString;
export const getNumber = pickNumber;
export const getImageUrl = resolveImageUrl;
