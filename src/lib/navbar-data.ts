import { NavbarData } from "@/types/navbar";

/** Shared populate query — must match Strapi navbar content-type relations. */
export const NAVBAR_POPULATE_QUERY =
  "populate[services][populate][serviceIcon]=true&populate[services][populate][service]=true&populate[industries][populate][industryIcon]=true&populate[approach][populate][approachIcon]=true&populate[solution][populate][solutionIcon]=true&populate[solution][populate][sidbar]=true&populate[ServiceSidbarImage]=true&populate[navbarIcom]=true&populate[footerIcon]=true";

// Base URL of Strapi API
const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;

// Authentication token
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

/** Helper function to make fetch requests with common headers */
const fetchWithHeaders = async (
  url: string,
  options: RequestInit = {},
) => {
  const headers: HeadersInit = {
    ...(AUTH_TOKEN
      ? { Authorization: `Bearer ${AUTH_TOKEN}` }
      : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    console.error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
};

/** Get navbar API URL */
export function getNavbarApiUrl(): string {
  return `/navbar?${NAVBAR_POPULATE_QUERY}`;
}

/** Server-side fetch (layout, RSC pages). */
export async function fetchNavbarDataServer(): Promise<NavbarData | null> {
  try {
    const json = await fetchWithHeaders(getNavbarApiUrl());

    return (json?.data as NavbarData) ?? null;
  } catch (error) {
    console.error("[navbar] Error fetching navbar data:", error);
    return null;
  }
}

/** True when CMS data is present enough to render navbar menus. */
export function hasNavbarCmsContent(
  data: NavbarData | null | undefined,
): boolean {
  if (!data) return false;

  return Boolean(
    data.services?.some((s) => s.service?.serviceTitle) ||
      data.industries?.some((i) => i.industryTitle) ||
      data.approach?.some((a) => a.approachTitle) ||
      data.solution?.some((s) => s.solutoinTitle) ||
      (data.solutionCategories &&
        data.solutionCategories.length > 0),
  );
}