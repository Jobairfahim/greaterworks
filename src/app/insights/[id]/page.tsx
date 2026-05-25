import { notFound } from "next/navigation";
import { Blog } from "@/types/insights";
import BlogPostLayout from "./BlogPostLayout";

async function getBlogBySlugOrDocumentId(id: string): Promise<Blog | null> {
  try {
    const encodedId = encodeURIComponent(id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?filters[$or][0][slug][$eq]=${encodedId}&filters[$or][1][documentId][$eq]=${encodedId}&populate=*`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`Failed to fetch blog: ${res.status} ${res.statusText}`);
      return null;
    }
    const json = await res.json();
    const blogs: Blog[] = json.data ?? [];
    return blogs[0] ?? null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogBySlugOrDocumentId(id);

  if (!blog) {
    notFound();
  }

  const formattedDate = blog.publishingDate
    ? new Date(blog.publishingDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return <BlogPostLayout blog={blog} formattedDate={formattedDate} />;
}
