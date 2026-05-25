/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
 
// Base URL of your Strapi API
const BASE_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`; // Change this if Strapi is hosted elsewhere
 
// Your provided authentication token
const AUTH_TOKEN = process.env.AUTH_TOKEN;
// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
});
 
// Function to fetch data from a collection
export const fetchCollection = async (collectionName: string) => {
  try {
    const response = await api.get(`/${collectionName}?populate=*`);
    return response.data.data.length > 0 ? response.data.data : []; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
// Function to fetch data from a collection
export const fetchSingleTypes = async (collectionName: string) => {
  try {
    const response = await api.get(`/${collectionName}?populate=*`);
    return response.data.data // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchTeamCollection = async (collectionName: string) => {
  try {
    const response = await api.get(`/${collectionName}?populate[social][populate]=*&populate[image]=true`);
    return response.data.data.length > 0 ? response.data.data : []; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchProjectCollection = async (collectionName: string, slug?: string) => {
  try {
    let url = `/${collectionName}?populate=*`;
    if (slug) {
      url += `&filters[category][slug][$eq]=${slug}`;
    }
    const response = await api.get(url);
    return response.data.data.length > 0 ? response.data.data : []; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
 
export const fetchServicesWithCollection = async (collectionName: string) => {
  try {
    const response = await api.get(`/services?populate[${collectionName}][populate]=*
`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const fetchServiceWithCollection = async (collectionName: string, slug: string) => {
  try {
    const response = await api.get(`/services?filters[slug][$eq]=${slug}&populate[${collectionName}][populate]=*`);
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
 
export const fetchCollectionByCategoryWithPagination = async (
  collectionName: string,
  category?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  try {
    let url = `/${collectionName}?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
 
    if (category) {
      url += `&filters[category][slug][$eq]=${category}`;
    }
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
 
export const fetchCollectionWithPagination = async (
  collectionName: string,
  page: number,
  pageSize: number
) => {
  try {
    const response = await api.get(
      `/${collectionName}?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
 
export const fetchEntryBySlug = async (collectionName: string, slug: string) => {
  try {
    const response = await api.get(
      `/${collectionName}?filters[slug][$eq]=${slug}&populate=*`
    );
    return response.data.data.length > 0 ? response.data.data[0] : null; // Return the first entry or null if no entry found
  } catch (error) {
    console.error("Error fetching entry by slug:", error);
    return null;
  }
};
 
// Function to get a single entry by ID
export const fetchEntryById = async (collectionName: string, id: string | number) => {
  try {
    const response = await api.get(`/${collectionName}/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching entry:", error);
    return null;
  }
};

// Function to fetch navbar data with specific populate parameters for footer
export const fetchNavbarData = async () => {
  try {
    // Call the Next.js API route instead of Strapi directly (avoids CORS issues)
    const response = await fetch("/api/navbar");
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch navbar data");
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching navbar data:", error.message);
    } else {
      console.error("Error fetching navbar data:", error);
    }
    return null;
  }
};

// Function to fetch privacy policy data
export const fetchPrivacyPolicyData = async () => {
  try {
    const response = await fetch("/api/privacy-policy");
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch privacy policy data");
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching privacy policy data:", error.message);
    } else {
      console.error("Error fetching privacy policy data:", error);
    }
    return null;
  }
};

// Function to fetch terms and condition data
export const fetchTermsAndConditionData = async () => {
  try {
    const response = await fetch("/api/terms-and-condition");
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch terms and condition data");
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching terms and condition data:", error.message);
    } else {
      console.error("Error fetching terms and condition data:", error);
    }
    return null;
  }
};
 
// Function to create a new entry
export const createEntry = async (collectionName: string, data: any) => {
  try {
    const response = await api.post(`/${collectionName}`, { data });
    return response.data;
  } catch (error) {
    console.error("Error creating entry:", error);
    return null;
  }
};
 
// Function to update an entry
export const updateEntry = async (collectionName: string, id: string | number, data: any) => {
  try {
    const response = await api.put(`/${collectionName}/${id}`, { data });
    return response.data;
  } catch (error) {
    console.error("Error updating entry:", error);
    return null;
  }
};
 
// Function to delete an entry
export const deleteEntry = async (collectionName: string, id: string | number) => {
  try {
    const response = await api.delete(`/${collectionName}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting entry:", error);
    return null;
  }
};
 
export default api;