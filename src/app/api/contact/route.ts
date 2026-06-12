import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errorJson = await res.json().catch(() => ({ error: "Failed to submit message to CMS" }));
            console.error("Strapi Contact POST error response:", res.status, errorJson);
            return NextResponse.json(errorJson, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in Next.js contact proxy route:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
