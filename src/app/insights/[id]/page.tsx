"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInsightById } from "@/data/insightsData";
import { use } from "react";

export default function InsightPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const insight = getInsightById(resolvedParams.id);

  if (!insight) {
    notFound();
  }

  return (
    <div className="insight-post-page">
      {/* Article Header */}
      <header className="article-header">
        <div className="container-3 w-container">
          <Link href="/insights" className="back-link">
            ← Back to Insights
          </Link>
          
          <div className="article-meta">
            {insight.date && <span className="meta-item">{insight.date}</span>}
            {insight.author && (
              <>
                <span className="meta-divider">•</span>
                <span className="meta-item">{insight.author}</span>
              </>
            )}
            {insight.readTime && (
              <>
                <span className="meta-divider">•</span>
                <span className="meta-item">{insight.readTime}</span>
              </>
            )}
          </div>
          
          <h1 className="article-title">{insight.title}</h1>
          <p className="article-subtitle">{insight.description}</p>
        </div>
      </header>

      {/* Featured Image */}
      <div className="featured-image-wrapper">
        <Image 
          src={insight.image} 
          alt={insight.title} 
          width={1200} 
          height={600} 
          className="featured-image" 
          priority
        />
      </div>

      {/* Article Content */}
      <main className="article-content container-3 w-container">
        <div className="content-wrapper">
          <p className="content-text">
            {insight.content || "Full article content coming soon."}
          </p>
          
          {/* Mock additional content for visual representation */}
          <h2 className="content-heading">Understanding the Basics</h2>
          <p className="content-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="content-text">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <div className="content-quote">
            "Innovation distinguishes between a leader and a follower. Building robust applications is the cornerstone of digital innovation."
          </div>
          
          <h2 className="content-heading">Next Steps and Implementation</h2>
          <p className="content-text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
        </div>
      </main>

      <style jsx>{`
        .insight-post-page {
          min-height: 100vh;
          background: #f8fafc;
          padding-bottom: 80px;
        }

        .article-header {
          padding: 60px 0 40px;
          background: white;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          color: #667eea;
          text-decoration: none;
          font-weight: 400;
          margin-bottom: 30px;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: #5a67d8;
        }

        .article-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #718096;
          font-size: 14px;
          font-family: "Satoshi", sans-serif;
        }

        .meta-divider {
          color: #cbd5e0;
        }

        .article-title {
          font-size: 48px;
          font-weight: 400;
          color: #1a202c;
          margin-bottom: 24px;
          line-height: 1.2;
          font-family: "Satoshi", sans-serif;
          max-width: 900px;
        }

        .article-subtitle {
          font-size: 20px;
          color: #4a5568;
          line-height: 1.6;
          max-width: 800px;
          font-family: "Satoshi", sans-serif;
        }

        .featured-image-wrapper {
          margin-top: -30px;
          margin-bottom: 60px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 20px;
        }

        .featured-image {
          width: 100%;
          height: auto;
          max-height: 450px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .article-content {
          display: flex;
          justify-content: center;
        }

        .content-wrapper {
          max-width: 800px;
          width: 100%;
        }

        .content-text {
          font-size: 18px;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 24px;
          font-family: "Satoshi", sans-serif;
        }

        .content-heading {
          font-size: 32px;
          font-weight: 400;
          color: #1a202c;
          margin: 48px 0 24px;
          font-family: "Satoshi", sans-serif;
        }

        .content-quote {
          font-size: 24px;
          font-style: italic;
          color: #2d3748;
          padding: 32px;
          border-left: 4px solid #667eea;
          background: white;
          margin: 40px 0;
          border-radius: 0 12px 12px 0;
          line-height: 1.6;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 768px) {
          .article-title {
            font-size: 36px;
          }
          
          .article-subtitle {
            font-size: 18px;
          }

          .article-header {
            padding: 40px 0;
          }

          .featured-image-wrapper {
            margin-top: 0;
            margin-bottom: 40px;
          }

          .content-text {
            font-size: 16px;
          }

          .content-heading {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
