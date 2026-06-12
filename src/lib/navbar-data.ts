import { NavbarData } from "@/types/navbar";

/** Shared populate query — must match Strapi navbar content-type relations. */
export const NAVBAR_POPULATE_QUERY =
  "populate[services][populate][serviceIcon]=true&populate[services][populate][service]=true&populate[industries][populate][industryIcon]=true&populate[approach][populate][approachIcon]=true&populate[solution][populate][solutionIcon]=true&populate[solution][populate][sidbar]=true&populate[ServiceSidbarImage]=true&populate[navbarIcom]=true&populate[footerIcon]=true";

export function getNavbarApiUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
  if (!base) return null;
  return `${base}/api/navbar?${NAVBAR_POPULATE_QUERY}`;
}

/** Server-side fetch (layout, RSC pages). */
export async function fetchNavbarDataServer(): Promise<NavbarData | null> {
  const url = getNavbarApiUrl();
  const token = process.env.AUTH_TOKEN;

  if (!url) {
    console.error("[navbar] NEXT_PUBLIC_SERVER_URL is not set");
    return null;
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      console.error(`[navbar] Strapi fetch failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const json = await res.json();
    return (json?.data as NavbarData) ?? null;
  } catch (error) {
    console.error("[navbar] Strapi fetch error:", error);
    return null;
  }
}

/** True when CMS data is present enough to render navbar menus. */
export function hasNavbarCmsContent(data: NavbarData | null | undefined): boolean {
  if (!data) return false;
  return Boolean(
    data.services?.some((s) => s.service?.serviceTitle) ||
      data.industries?.some((i) => i.industryTitle) ||
      data.approach?.some((a) => a.approachTitle) ||
      data.solution?.some((s) => s.solutoinTitle) ||
      (data.solutionCategories && data.solutionCategories.length > 0)
  );
}
