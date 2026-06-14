"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/insights";
import BlogDetailClient, { ContentRenderer } from "./BlogDetailClient";

interface BlogPostLayoutProps {
  blog: Blog;
  formattedDate: string | null;
}

export default function BlogPostLayout({
  blog,
  formattedDate,
}: BlogPostLayoutProps) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscriptionStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = String(formData.get("fullName") || "");
    const email = String(formData.get("email") || "");

    try {
      const res = await fetch("/api/supscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            fullName,
            email,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error(
          "Failed to subscribe:",
          res.status,
          res.statusText,
          errData,
        );
        setSubscriptionStatus("error");
        return;
      }

      setSubscriptionStatus("success");
      form.reset();
    } catch (error) {
      console.error("Error submitting subscription:", error);
      setSubscriptionStatus("error");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="insight-post-page">
      <div className="blog-layout-grid">
        {/* Left sidebar + TOC */}
        <BlogDetailClient blog={blog} />

        {/* Main Content */}
        <main className="center-content">
          <div className="breadcrumbs">
            <Link href="/">Home / </Link>
            <Link href="/insights">Insights</Link>
          </div>

          <h1 className="article-title">{blog.title}</h1>

          <div className="author-meta-block">
            <div className="author-avatar">
              <Image
                src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e51d8ba178421e5a3e8949_header%20menu%20image.jpg"
                alt={blog.authorName}
                width={48}
                height={48}
                className="avatar-img"
              />
            </div>
            <div className="author-info">
              <div
                className="author-name mb-0 mr-2"
                style={{ marginBottom: 0 }}
              >
                {blog.authorName}
              </div>
              <div className="author-details">
                {formattedDate && (
                  <>
                    <span className="meta-dot">·</span>
                    <span>Updated on: {formattedDate}</span>
                  </>
                )}
                {blog.readTime && (
                  <>
                    <span className="meta-dot">·</span>
                    <span>{blog.readTime}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Blog HTML content */}
          <ContentRenderer html={blog.description} />
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="promo-card light">
            <div className="promo-icon outline-icon">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <h3 className="promo-title">Stay Updated</h3>
            <p className="promo-text">
              Join thousands of readers
              <br />
              getting smarter every week.
            </p>
            <form className="promo-form" onSubmit={handleSubscribe}>
              <div className="form-group service-form-group promo-input-group">
                <label className="from-group-title service-form-title promo-label">
                  Full Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="field-form full text-field-2 service-form-field promo-input w-input"
                  placeholder="Enter your full name "
                />
              </div>
              <div className="form-group service-form-group promo-input-group">
                <label className="from-group-title service-form-title promo-label">
                  Email Address<span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="field-form full service-form-field promo-input w-input"
                  placeholder="Enter your email address"
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="button-primary service-button-primary promo-btn block w-button"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
                <Image
                  alt="arrow-top-right"
                  src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg"
                  width={16}
                  height={16}
                  className="button-icon"
                />
              </button>
              {subscriptionStatus === "success" && (
                <p className="promo-status success">
                  Thank you! You have been subscribed.
                </p>
              )}
              {subscriptionStatus === "error" && (
                <p className="promo-status error">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .insight-post-page {
          min-height: 100vh;
          background: #ffffff;
          padding-bottom: 80px;
        }

        .blog-layout-grid {
          display: grid;
          grid-template-columns: 200px 1fr 280px;
          gap: 40px;
          padding-top: 60px;
          padding-bottom: 80px;
          align-items: start;
          max-width: 1400px;
          margin: 0 auto;
          padding-left: 32px;
          padding-right: 32px;
        }

        /* ── Left sidebar ── */
        :global(.left-sidebar) {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        :global(.social-share) {
          display: flex;
          gap: 12px;
          align-items: center;
          padding-left: 8px;
        }

        :global(.social-btn) {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #000;
          transition: all 0.2s ease;
          padding: 0;
        }

        :global(.social-btn.facebook) {
          color: #1877f2;
        }
        :global(.social-btn.twitter) {
          color: #000000;
        }
        :global(.social-btn.pinterest) {
          color: #e60023;
        }
        :global(.social-btn.linkedin) {
          color: #0a66c2;
        }

        :global(.sidebar-content) {
          background: #fafafa;
          border-radius: 8px;
          padding: 24px 20px;
          max-height: calc(100vh - 150px);
          overflow-y: auto;
        }

        :global(.sidebar-content::-webkit-scrollbar) {
          width: 6px;
        }
        :global(.sidebar-content::-webkit-scrollbar-thumb) {
          background: #cbd5e1;
          border-radius: 4px;
        }

        :global(.sidebar-title) {
          margin-bottom: 12px;
        }

        :global(.toc-list) {
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        :global(.toc-list li) {
          position: relative;
          padding-left: 12px;
        }

        :global(.toc-list li::before) {
          content: "•";
          position: absolute;
          left: 0;
          top: -2px;
          color: #111111 !important;
          font-size: 16px;
        }

        :global(.toc-link) {
          text-align: left;
          padding: 0;
          border: none;
          background: none !important;
          cursor: pointer;
          transition: color 0.2s ease;
          display: block;
          width: 100%;
          opacity: 1 !important;
          visibility: visible !important;
        }

        :global(.toc-sub-item) {
          padding-left: 16px !important;
        }

        :global(.toc-sub-item::before) {
          content: "—" !important;
          font-size: 12px !important;
        }

        :global(.toc-link.active) {
          text-decoration: underline;
        }

        /* ── Content wrapper ── */
        :global(.content-wrapper) {
          margin-top: 40px;
        }

        :global(.content-wrapper p) {
          margin-bottom: 24px;
        }
        :global(.content-wrapper h2) {
          margin: 40px 0 20px;
        }
        :global(.content-wrapper h3) {
          margin: 32px 0 16px;
        }
        :global(.content-wrapper blockquote) {
          font-style: italic;
          padding: 24px 32px;
          border-left: 4px solid var(--primary);
          background: #f8fafc;
          margin: 32px 0;
          border-radius: 0 12px 12px 0;
        }
        :global(.content-wrapper a) {
          text-decoration: underline;
        }
        :global(.content-wrapper ul),
        :global(.content-wrapper ol) {
          padding-left: 24px;
          margin-bottom: 24px;
        }
        :global(.content-wrapper li) {
          margin-bottom: 8px;
        }

        /* ── Center column ── */
        .center-content {
          min-width: 0;
        }

        .breadcrumbs {
          margin-bottom: 20px;
        }

        .breadcrumbs :global(a) {
          text-decoration: none;
        }

        .breadcrumbs :global(a:hover) {
          text-decoration: underline;
        }

        .article-title {
          margin-bottom: 20px;
        }

        .author-meta-block {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 40px;
        }

        .author-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .author-name {
          margin-bottom: 4px;
        }

        .author-details {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* ── Right sidebar ── */
        .right-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .promo-card {
          border-radius: 12px;
          padding: 32px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .promo-card.light {
          background: #fafafa;
          border: 1px solid #e9d5ff;
          color: #000;
          box-shadow: 0 12px 36px rgba(20, 20, 20, 0.06);
        }

        .promo-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .outline-icon {
          background: #f5f0ff;
          color: #9433e9;
        }

        .promo-title {
          margin-bottom: 12px;
        }

        .promo-text {
          margin-bottom: 24px;
        }

        .promo-btn {
          cursor: pointer;
        }

        .promo-btn.block {
          width: 100%;
          margin-top: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 38px;
        }

        .promo-btn.block:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        .promo-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        .promo-input-group {
          width: 100%;
          text-align: left;
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .promo-label {
          display: flex;
          align-items: center;
          margin-bottom: 0;
        }

        .promo-label .required {
          margin-left: 2px;
        }

        .promo-input {
          width: 100%;
          height: 52px;
          min-height: 52px;
          margin-bottom: 0;
          background-color: #fff;
        }

        .promo-input::placeholder {
          font-size: 14px;
        }
        .promo-input:focus {
          border-color: var(--primary);
        }

        .promo-status {
          margin: 12px 0 0;
          text-align: left;
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .blog-layout-grid {
            gap: 24px;
          }
        }

        @media (max-width: 991px) {
          .blog-layout-grid {
            grid-template-columns: 1fr 300px;
          }
          :global(.left-sidebar) {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .blog-layout-grid {
            grid-template-columns: 1fr;
          }
          .right-sidebar {
            position: static;
          }
          .center-content {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}
