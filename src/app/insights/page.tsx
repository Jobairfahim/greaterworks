import { Blog, BlogPageData } from "@/types/insights";
import InsightsClient from "./InsightsClient";
import { allInsights } from "@/data/insightsData";
import "./insights-typography.css";

async function getBlogPageData(): Promise<BlogPageData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-page`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      console.error(
        `Failed to fetch blog-page data: ${res.status} ${res.statusText}`
      );
      return null;
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching blog-page data:", error);
    return null;
  }
}

async function getBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?populate=*&sort[0]=publishingDate:desc`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    );
    if (!res.ok) {
      console.error(`Failed to fetch blogs: ${res.status} ${res.statusText}`);
      return [];
    }
    const json = await res.json();
    return json.data ?? [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

function getFallbackBlogs(): Blog[] {
  return allInsights.map((insight, index) => {
    const date = insight.date ? new Date(insight.date) : new Date();
    return {
      excerpt: insight.description,
      id: index + 1,
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
  });
}

export default async function InsightsPage() {
  const [blogPageData, blogs] = await Promise.all([
    getBlogPageData(),
    getBlogs(),
  ]);

  return <InsightsClient data={blogPageData} blogs={blogs.length > 0 ? blogs : getFallbackBlogs()} />;
}
