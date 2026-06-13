import axios from "axios";
import { NAVBAR_POPULATE_QUERY } from "@/lib/navbar-data";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:1337";
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

export async function GET() {
  try {
    if (!BASE_URL) {
      return Response.json(
        { error: "NEXT_PUBLIC_SERVER_URL environment variable is not set" },
        { status: 500 }
      );
    }

    const api = axios.create({
      baseURL: `${BASE_URL}/api`,
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    const response = await api.get(`/navbar?${NAVBAR_POPULATE_QUERY}`);

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
