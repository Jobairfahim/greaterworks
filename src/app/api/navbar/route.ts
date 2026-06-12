import axios from "axios";

// Normalize NEXT_PUBLIC_SERVER_URL: sometimes it's the string 'undefined' in some env setups.
const rawBase = process.env.NEXT_PUBLIC_SERVER_URL;
const BASE_URL = (typeof rawBase === "string" && rawBase && rawBase !== "undefined") ? rawBase : "http://localhost:1337";
const AUTH_TOKEN = process.env.AUTH_TOKEN;

export async function GET() {
  try {
    // Ensure we have a usable base url
    if (!BASE_URL || BASE_URL === "undefined") {
      return Response.json(
        { error: "NEXT_PUBLIC_SERVER_URL is not configured on the server" },
        { status: 500 }
      );
    }

    const api = axios.create({
      baseURL: `${BASE_URL.replace(/\/$/, "")}/api`,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 5000,
    });

    const response = await api.get(
      `/navbar?populate[services][populate][serviceIcon]=true&populate[services][populate][service]=true&populate[industries][populate][industryIcon]=true&populate[approach][populate][approachIcon]=true&populate[solution][populate][solutionIcon]=true&populate[solution][populate][sidbar]=true&populate[ServiceSidbarImage]=true&populate[navbarIcom]=true&populate[footerIcon]=true`
    );

    return Response.json(response.data);
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    if (error instanceof Error) {
      return Response.json(
        { error: error.message || "Failed to fetch navbar data" },
        { status: 500 }
      );
    }
    return Response.json(
      { error: "Failed to fetch navbar data" },
      { status: 500 }
    );
  }
}
