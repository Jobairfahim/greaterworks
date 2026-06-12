/* eslint-disable @typescript-eslint/no-explicit-any */

import { asArray, CmsRecord } from "@/app/services/[id]/page";

// Base URL of your Strapi API
const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`; // Change this if Strapi is hosted elsewhere

// Your provided authentication token
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

// Helper function to make fetch requests with common headers
const fetchWithHeaders = async (url: string, options: RequestInit = {}) => {
  const headers: HeadersInit = {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    ...options.headers,
  };
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    console.error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};

// Function to fetch data from a collection
export const fetchCollection = async (collectionName: string) => {
  try {
    const data = await fetchWithHeaders(`/${collectionName}?populate=*`);
    return data.data && data.data.length > 0 ? data.data : []; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
// Function to fetch data from a collection
export const fetchSingleTypes = async (collectionName: string) => {
  try {
    const data = await fetchWithHeaders(`/${collectionName}?populate=*`);
    return data.data; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchTeamCollection = async (collectionName: string) => {
  try {
    const data = await fetchWithHeaders(
      `/${collectionName}?populate[social][populate]=*&populate[image]=true`,
    );
    return data.data && data.data.length > 0 ? data.data : []; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchProjectCollection = async (
  collectionName: string,
  slug?: string,
) => {
  try {
    let url = `/${collectionName}?populate=*`;
    if (slug) {
      url += `&filters[category][slug][$eq]=${slug}`;
    }
    const data = await fetchWithHeaders(url);
    return data.data && data.data.length > 0 ? data.data : []; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchServicesWithCollection = async (collectionName: string) => {
  try {
    const data = await fetchWithHeaders(
      `/services?populate[${collectionName}][populate]=*`,
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchServiceWithCollection = async (
  collectionName: string,
  slug: string,
) => {
  try {
    const data = await fetchWithHeaders(
      `/services?filters[slug][$eq]=${slug}&populate[${collectionName}][populate]=*`,
    );
    return data.data ? data.data[0] : null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchCollectionByCategoryWithPagination = async (
  collectionName: string,
  category?: string,
  page: number = 1,
  pageSize: number = 10,
) => {
  try {
    let url = `/${collectionName}?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

    if (category) {
      url += `&filters[category][slug][$eq]=${category}`;
    }
    const data = await fetchWithHeaders(url);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchCollectionWithPagination = async (
  collectionName: string,
  page: number,
  pageSize: number,
) => {
  try {
    const data = await fetchWithHeaders(
      `/${collectionName}?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

export const fetchEntryBySlug = async (
  collectionName: string,
  slug: string,
) => {
  try {
    const data = await fetchWithHeaders(
      `/${collectionName}?filters[slug][$eq]=${slug}&populate=*`,
    );
    return data.data && data.data.length > 0 ? data.data[0] : null; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching entry by slug:", error);
    return null;
  }
};

// Function to get a single entry by ID
export const fetchEntryById = async (
  collectionName: string,
  id: string | number,
) => {
  try {
    const data = await fetchWithHeaders(`/${collectionName}/${id}?populate=*`);
    return data.data;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return null;
  }
};

// Function to fetch navbar data with specific populate parameters for footer
export const fetchNavbarData = async () => {
  try {
    const data = await fetchWithHeaders("/navbar");
    return data.data;
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    return null;
  }
};

// Function to fetch privacy policy data
export const fetchPrivacyPolicyData = async () => {
  try {
    const data = await fetchWithHeaders("/privacy-policy");
    return data.data;
  } catch (error) {
    console.error("Error fetching privacy policy data:", error);
    return null;
  }
};

export const fetchGDPRPolicyData = async () => {
  try {
    const data = await fetchWithHeaders("/gdpr");
    return data.data;
  } catch (error) {
    console.error("Error fetching GDPR policy data:", error);
    return null;
  }
};

// Function to fetch terms and condition data
export const fetchTermsAndConditionData = async () => {
  try {
    const data = await fetchWithHeaders("/terms-and-condition");
    return data.data;
  } catch (error) {
    console.error("Error fetching terms and condition data:", error);
    return null;
  }
};

// Function to create a new entry
export const createEntry = async (collectionName: string, data: any) => {
  try {
    const response = await fetchWithHeaders(`/${collectionName}`, {
      method: "POST",
      body: JSON.stringify({ data }),
    });
    return response;
  } catch (error) {
    console.error("Error creating entry:", error);
    return null;
  }
};

// Function to update an entry
export const updateEntry = async (
  collectionName: string,
  id: string | number,
  data: any,
) => {
  try {
    const response = await fetchWithHeaders(`/${collectionName}/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
    return response;
  } catch (error) {
    console.error("Error updating entry:", error);
    return null;
  }
};

// Function to delete an entry
export const deleteEntry = async (
  collectionName: string,
  id: string | number,
) => {
  try {
    const response = await fetchWithHeaders(`/${collectionName}/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error deleting entry:", error);
    return null;
  }
};

const SERVICE_POPULATE_QUERY =
  "populate[bannar][populate][bannarImage]=true&populate[bannar][populate][brandsImages]=true&populate[chooseUs][populate][chooseUsSectionData][populate][icon]=true&populate[offer]=true&populate[selectedWork][populate][selectedWorkSectionData][populate][image]=true&populate[ourProcess][populate][ourProcessBgImage]=true&populate[ourProcess][populate][testimonial][populate][image]=true&populate[ourProcess][populate][process]=true&populate[faq][populate][faqs]=true&pagination[pageSize]=10&pagination[page]=1";
export async function getServiceBySlug(
  slug: string,
): Promise<CmsRecord | null> {
  try {
    const res = await fetchWithHeaders(
      `/services?filters[slug][$eq]=${encodeURIComponent(
        slug,
      )}&${SERVICE_POPULATE_QUERY}`,
    );

    const services = asArray(res.data);
    return services[0] ?? null;
  } catch (error) {
    console.error("Error fetching service:", error);
    return null;
  }
}
