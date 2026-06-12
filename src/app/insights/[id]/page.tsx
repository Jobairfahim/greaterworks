import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Blog } from "@/types/insights";
import BlogPostLayout from "./BlogPostLayout";
import { getInsightById } from "@/data/insightsData";
import "../insights-typography.css";

async function getBlogBySlugOrDocumentId(id: string): Promise<Blog | null> {
  try {
    const encodedId = encodeURIComponent(id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?filters[$or][0][slug][$eq]=${encodedId}&filters[$or][1][documentId][$eq]=${encodedId}&populate=*`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
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

function getFallbackBlog(id: string): Blog | null {
  const insight = getInsightById(id);
  if (!insight) return null;

  const date = insight.date ? new Date(insight.date) : new Date();

  return {
    excerpt: insight.description,
    id: 0,
    documentId: insight.id,
    title: insight.title,
    publishingDate: date.toISOString(),
    readTime: insight.readTime ?? "5 min read",
    authorName: insight.author ?? "Greater Works Team",
    authorEmail: "sales@greaterworks.tech",
    description: insight.content ? `<p>${insight.content}</p>` : `<p>${insight.description}</p>`,
    slug: insight.id,
    coverImage: null,
    facebookLink: null,
    twitterLink: null,
    pinterestLink: null,
    linkedinLink: null,
    createdAt: date.toISOString(),
    updatedAt: date.toISOString(),
    publishedAt: date.toISOString(),
  };
}

export default async function InsightPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = (await getBlogBySlugOrDocumentId(id)) ?? getFallbackBlog(id);

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = (await getBlogBySlugOrDocumentId(id)) ?? getFallbackBlog(id);

  if (!blog) {
    return {
      title: "Insight Not Found",
    };
  }

  const title = blog.seo?.metaTitle || blog.title;
  const description = blog.seo?.metaDescription || blog.excerpt || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
