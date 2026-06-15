"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import ContactSection from "@/component/ContactSection";
import { Blog, BlogPageData } from "@/types/insights";
import { LuMoveUpRight } from "react-icons/lu";

const FALLBACK_BLOG_IMAGE =
  "https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/695d1bbd9c1d82c15d69cbec_img-07.jpg";

function getMediaUrl(url?: string | null) {
  if (!url) return FALLBACK_BLOG_IMAGE;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL ?? ""}${url}`;
}

function getBlogImage(blog: Blog) {
  const imageUrl =
    blog.coverImage?.formats?.large?.url ||
    blog.coverImage?.formats?.medium?.url ||
    blog.coverImage?.formats?.small?.url ||
    blog.coverImage?.url;

  return getMediaUrl(imageUrl);
}

function getBlogHref(blog: Blog) {
  return `/insights/${blog.slug || blog.documentId}`;
}

function formatBlogDate(date?: string | null) {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html?: string | null) {
  return html?.replace(/<[^>]*>/g, " ") ?? "";
}

function ReadArticleButton({
  href,
  className = "",
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`title-button transition-none active-button w-inline-block no-hover ${className}`}
    >
      <div className="title-button-text">Read Article</div>
      <LuMoveUpRight className="title-button-text" />
    </Link>
  );
}

interface InsightsClientProps {
  data: BlogPageData | null;
  blogs: Blog[];
}

export default function InsightsClient({ data, blogs }: InsightsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const featuredBlogs = blogs.slice(0, 3);
  const baseLatestBlogs = blogs.length > 3 ? blogs.slice(3) : blogs;

  const filteredInsights = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stripHtml(blog.description)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  const isSearching = searchQuery.trim() !== "";
  const sourceList = isSearching ? filteredInsights : baseLatestBlogs;

  const totalPages = Math.ceil(sourceList.length / ITEMS_PER_PAGE);
  const currentDisplayBlogs = sourceList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // CMS-driven text with safe fallbacks
  const subtitle = data?.serviceTagline || "Latest Tech and Trends";
  const subtitle2 = data?.serviceTagline || "Featured Blogs";
  const subtitle3 = data?.serviceTagline || "Latest Blogs";
  // const heroTitle = data?.pageTitle ?? "Latest Tech and Trends";
  const heroSubtitle =
    data?.pageDescription ??
    "Get ahead with fresh insights, hands-on guides, and smart strategies to help you navigate the world of tech, eCommerce, and digital marketing with confidence.";

  const featuredSubtitle =
    data?.secondDiscription ??
    "Check out our top blogs, packed with expert tips, smart strategies, and fresh insights to keep you ahead in tech, eCommerce, and digital trends.";

  const latestSubtitle =
    data?.lastDiscription ??
    "Your go-to spot for fresh ideas, expert tips, and breakthrough insights in the digital world.";

  return (
    <div className="insights-hub-page">
      {/* Hero Section */}
      <section className="hub-hero">
        <div className="search-container" style={{ marginBottom: "40px" }}>
          <input
            type="text"
            placeholder="Search"
            className="hub-search-input"
            value={searchQuery}
            onChange={handleSearch}
          />
          <span className="search-icon-wrapper">
            <IoSearchOutline size={20} />
          </span>
        </div>

        <div className="section-head section-head-two" style={{ marginBottom: "40px" }}>
              <div className="title title-two">
                <div className="section-head-content-subtitle">
                  <div className="section-head-subtitle-dot" />
                  <p className="section-head-subtitle-content subtitle-secondary-content">{subtitle}</p>
                </div>
                <p className="section-title-description">{heroSubtitle}</p>
              </div>
        </div>

      </section>

      {searchQuery.trim() !== "" ? (
        <section className="latest-section">
          <h2 className="section-title">Search Results</h2>
          <p className="section-subtitle">
            Showing results for &quot;{searchQuery}&quot;
          </p>

          {filteredInsights.length > 0 ? (
            <>
              <div className="latest-grid">
                {currentDisplayBlogs.map((blog) => (
                  <div key={blog.id} className="latest-card">
                    <div className="latest-img-wrap">
                      <Image
                        src={getBlogImage(blog)}
                        alt={blog.title}
                        fill
                        className="latest-img"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="latest-card-content">
                      <h3 className="latest-title">{blog.title}</h3>
                      <p className="latest-date">
                        {formatBlogDate(blog.publishingDate)}
                      </p>
                      <ReadArticleButton href={getBlogHref(blog)} />
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="page-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="page-btn"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p
              className="insights-empty-message"
              style={{ padding: "40px 0" }}
            >
              No blogs found matching your search.
            </p>
          )}
        </section>
      ) : (
        <>
          {/* Featured Blogs */}
          <section className="featured-section">
            <div className="section-head section-head-two">
              <div className="title title-two">
                <div className="section-head-content-subtitle">
                  <div className="section-head-subtitle-dot" />
                  <p className="section-head-subtitle-content subtitle-secondary-content">{subtitle2}</p>
                </div>
                {/* <h2 className="title-h2-2 title-h2-two" style={{ margin: 0 }}>
                  {featuredTitle}
                </h2> */}
                <p className="section-title-description">{featuredSubtitle}</p>
              </div>
            </div>

            {featuredBlogs.length >= 3 && (
              <div className="featured-grid">
                {/* Left Large Card */}
                <div className="feat-card-large">
                  <div className="feat-img-wrap-large">
                    <Link
                      href={getBlogHref(featuredBlogs[0])}
                      className="block-link"
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                      }}
                    >
                      <Image
                        src={getBlogImage(featuredBlogs[0])}
                        alt={featuredBlogs[0].title}
                        fill
                        className="feat-img"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>
                  <div className="feat-content">
                    <h3 className="feat-title-large">
                      {featuredBlogs[0].title}
                    </h3>
                    <p className="feat-date">
                      {formatBlogDate(featuredBlogs[0].publishingDate)}
                    </p>
                    <ReadArticleButton
                      href={getBlogHref(featuredBlogs[0])}
                      className="read-article-featured-large"
                    />
                  </div>
                </div>

                {/* Right Stack */}
                <div className="feat-right-stack">
                  <div className="feat-card-small">
                    <div className="feat-img-wrap-small">
                      <Link
                        href={getBlogHref(featuredBlogs[1])}
                        className="block-link"
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                        }}
                      >
                        <Image
                          src={getBlogImage(featuredBlogs[1])}
                          alt={featuredBlogs[1].title}
                          fill
                          className="feat-img"
                          style={{ objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                    <div className="feat-content-small">
                      <h3 className="feat-title-small">
                        {featuredBlogs[1].title}
                      </h3>
                      <p className="feat-date">
                        {formatBlogDate(featuredBlogs[1].publishingDate)}
                      </p>
                      <ReadArticleButton
                        href={getBlogHref(featuredBlogs[1])}
                        className="read-article-featured-small"
                      />
                    </div>
                  </div>

                  <div className="feat-card-small">
                    <div className="feat-img-wrap-small">
                      <Link
                        href={getBlogHref(featuredBlogs[2])}
                        className="block-link"
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                        }}
                      >
                        <Image
                          src={getBlogImage(featuredBlogs[2])}
                          alt={featuredBlogs[2].title}
                          fill
                          className="feat-img"
                          style={{ objectFit: "cover" }}
                        />
                      </Link>
                    </div>
                    <div className="feat-content-small">
                      <h3 className="feat-title-small">
                        {featuredBlogs[2].title}
                      </h3>
                      <p className="feat-date">
                        {formatBlogDate(featuredBlogs[2].publishingDate)}
                      </p>
                      <ReadArticleButton
                        href={getBlogHref(featuredBlogs[2])}
                        className="read-article-featured-small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Latest Blogs */}
          <section className="latest-section">
            <div className="section-head section-head-two">
              <div className="title title-two">
                <div className="section-head-content-subtitle">
                  <div className="section-head-subtitle-dot" />
                  <p className="section-head-subtitle-content subtitle-secondary-content">{subtitle3}</p>
                </div>
                <p className="section-title-description">{latestSubtitle}</p>
              </div>
            </div>

            <div className="latest-grid">
              {currentDisplayBlogs.map((blog) => (
                <div key={blog.id} className="latest-card">
                  <div className="latest-img-wrap">
                    <Image
                      src={getBlogImage(blog)}
                      alt={blog.title}
                      fill
                      className="latest-img"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="latest-card-content">
                    <h3 className="latest-title">{blog.title}</h3>
                    <p className="latest-date">
                      {formatBlogDate(blog.publishingDate)}
                    </p>
                    <ReadArticleButton href={getBlogHref(blog)} />
                  </div>
                </div>
              ))}
            </div>

            {currentDisplayBlogs.length === 0 && (
              <p
                className="insights-empty-message"
                style={{ padding: "40px 0" }}
              >
                No blogs are available yet.
              </p>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="page-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="page-btn"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </section>
          <ContactSection isSimple={true} />
        </>
      )}

      <style jsx>{`
        .insights-hub-page {
          min-height: 100vh;
          background: #ffffff;
          padding-bottom: 100px;
        }

        /* Hero Section */
        .hub-hero {
          text-align: left;
          padding: 100px 40px 80px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .hub-title {
          margin-bottom: 0;
        }

        .hub-subtitle {
          margin-bottom: 0;
          max-width: 760px;
        }

        .search-container {
          position: relative;
          max-width: 500px;
          margin: 0 auto 40px;
        }

        .hub-search-input {
          width: 100%;
          padding: 16px 48px 16px 20px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .search-icon-wrapper {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hub-socials {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 16px;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .s-icon {
          color: #000;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .s-icon:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }

        .s-icon.fb {
          color: #1877f2;
        }
        .s-icon.ig {
          color: #e4405f;
        }
        .s-icon.pin {
          color: #e60023;
        }
        .s-icon.yt {
          color: #ff0000;
        }
        .s-icon.li {
          color: #0a66c2;
        }

        /* Shared Section Styles */
        .featured-section,
        .latest-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          margin-bottom: 80px;
        }

        .section-title {
        
          text-align: left;
          margin-bottom: 16px;
        }

        .section-subtitle {
          text-align: left;
          max-width: 700px;
          margin: 0 0 48px;
        }

        /* Featured Grid */
        .featured-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 24px;
        }

        .feat-card-large {
          display: flex;
          flex-direction: column;
        }

        .block-link {
          display: block;
        }

        .feat-img-wrap-large {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
          background: #f8fafc;
        }

        .feat-title-large {
          margin-bottom: 12px;
        }

        .feat-right-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feat-card-small {
          display: flex;
          flex-direction: column;
        }

        .feat-img-wrap-small {
          position: relative;
          width: 100%;
          height: 228px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
          background: #f8fafc;
        }

        .feat-title-small {
          margin-bottom: 8px;
        }

        .feat-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .feat-content-small {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        /* Latest Grid */
        .latest-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .latest-card {
          display: flex;
          flex-direction: column;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          overflow: hidden;
          background: #fff;
          transition:
            box-shadow 0.2s ease,
            transform 0.2s ease;
        }

        .latest-card:hover {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          transform: translateY(-4px);
        }

        .latest-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          background: #f8fafc;
        }

        .latest-card-content {
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .latest-title {
          font-size: 20px;
          font-weight: 400;
          color: #525252 !important;
          margin-bottom: 12px;
        }

        .latest-date {
          margin-bottom: 24px;
        }

        :global(.insights-hub-page .latest-card-content .title-button) {
          align-self: flex-start;
          margin-top: auto;
        }

        :global(.insights-hub-page .read-article-featured-large) {
          margin-top: 16px;
        }

        :global(.insights-hub-page .read-article-featured-small) {
          margin-top: 12px;
        }

        :global(.insights-hub-page .title-button:hover) {
          background-color: transparent !important;
          background-image: none !important;
        }

        :global(.insights-hub-page .active-button:hover) {
          background-color: transparent !important;
          background-image: none !important;
        }

        :global(.insights-hub-page .title-button.no-hover:hover) {
          background-color: transparent !important;
          background-image: none !important;
        }

        /* Pagination */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 16px;
          margin-top: 48px;
        }

        .page-btn {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          background: #fff;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .page-btn:hover:not(:disabled) {
          border-color: var(--primary);
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f9fafb;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
          .latest-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .hub-hero {
            padding: 60px 20px 40px;
          }
          .hub-socials {
            flex-direction: column;
          }
          .latest-grid {
            grid-template-columns: 1fr;
          }
          .feat-img-wrap-large {
            height: 300px;
          }
          .feat-img-wrap-small {
            height: 200px;
          }
          .featured-section,
          .latest-section {
            padding: 0 20px;
          }
        }
      `}</style>
    </div>
  );
}
