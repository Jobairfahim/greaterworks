"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { allInsights } from "@/data/insightsData";
import { 
  FaFacebookF, 
  FaXTwitter, 
  FaInstagram, 
  FaPinterestP, 
  FaYoutube, 
  FaLinkedinIn, 
  FaGithub 
} from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import ContactSection from "@/component/ContactSection";

export default function InsightsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const featuredBlogs = allInsights.slice(0, 3);
  const baseLatestBlogs = allInsights.slice(3);

  const filteredInsights = allInsights.filter(insight => 
    insight.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    insight.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isSearching = searchQuery.trim() !== "";
  const sourceList = isSearching ? filteredInsights : baseLatestBlogs;
  
  const totalPages = Math.ceil(sourceList.length / ITEMS_PER_PAGE);
  const currentDisplayBlogs = sourceList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="insights-hub-page">
      {/* Hero Section */}
      <section className="hub-hero">
        <h1 className="hub-title">Latest Tech and Trends</h1>
        <p className="hub-subtitle">
          Get ahead with fresh insights, hands-on guides, and smart strategies to help you navigate the world of tech, eCommerce, and digital marketing with confidence.
        </p>
        
        <div className="search-container">
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

        <div className="hub-socials">
          <span className="social-text">Follow us for the latest insights →</span>
          <div className="social-icons">
            <a href="#" className="s-icon fb"><FaFacebookF size={18} /></a>
            <a href="#" className="s-icon x"><FaXTwitter size={18} /></a>
            <a href="#" className="s-icon ig"><FaInstagram size={18} /></a>
            <a href="#" className="s-icon pin"><FaPinterestP size={18} /></a>
            <a href="#" className="s-icon yt"><FaYoutube size={18} /></a>
            <a href="#" className="s-icon li"><FaLinkedinIn size={18} /></a>
            <a href="#" className="s-icon gh"><FaGithub size={18} /></a>
          </div>
        </div>
      </section>

      {searchQuery.trim() !== "" ? (
        <section className="latest-section">
          <h2 className="section-title">Search Results</h2>
          <p className="section-subtitle">
            Showing results for "{searchQuery}"
          </p>

          {filteredInsights.length > 0 ? (
            <>
              <div className="latest-grid">
                {currentDisplayBlogs.map((blog) => (
                  <div key={blog.id} className="latest-card">
                    <div className="latest-img-wrap">
                      <Image src={blog.image} alt={blog.title} fill className="latest-img" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="latest-card-content">
                      <h3 className="latest-title">{blog.title}</h3>
                      <p className="latest-date">{blog.date}</p>
                      <Link href={`/insights/${blog.id}`} className="btn-outline">
                        Read Article
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="page-btn" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="page-info">Page {currentPage} of {totalPages}</span>
                  <button 
                    className="page-btn" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <p style={{ textAlign: "center", color: "#6b7280", padding: "40px 0" }}>
              No blogs found matching your search.
            </p>
          )}
        </section>
      ) : (
        <>
          {/* Featured Blogs */}
          <section className="featured-section">
            <h2 className="section-title">Featured Blogs</h2>
            <p className="section-subtitle">
              Check out our top blogs, packed with expert tips, smart strategies, and fresh insights to keep you ahead in tech, eCommerce, and digital trends.
            </p>

            {featuredBlogs.length >= 3 && (
              <div className="featured-grid">
                {/* Left Large Card */}
                <div className="feat-card-large">
                  <div className="feat-img-wrap-large">
                    <Link href={`/insights/${featuredBlogs[0].id}`} className="block-link" style={{ width: '100%', height: '100%', display: 'block' }}>
                      <Image src={featuredBlogs[0].image} alt={featuredBlogs[0].title} fill className="feat-img" style={{ objectFit: 'cover' }} />
                    </Link>
                  </div>
                  <div className="feat-content">
                    <h3 className="feat-title-large">{featuredBlogs[0].title}</h3>
                    <p className="feat-date">{featuredBlogs[0].date}</p>
                    <Link href={`/insights/${featuredBlogs[0].id}`} className="btn-outline" style={{ marginTop: '16px' }}>
                      Read Article
                    </Link>
                  </div>
                </div>

                {/* Right Stack */}
                <div className="feat-right-stack">
                  <div className="feat-card-small">
                    <div className="feat-img-wrap-small">
                      <Link href={`/insights/${featuredBlogs[1].id}`} className="block-link" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <Image src={featuredBlogs[1].image} alt={featuredBlogs[1].title} fill className="feat-img" style={{ objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="feat-content-small">
                      <h3 className="feat-title-small">{featuredBlogs[1].title}</h3>
                      <p className="feat-date">{featuredBlogs[1].date}</p>
                      <Link href={`/insights/${featuredBlogs[1].id}`} className="btn-outline" style={{ marginTop: '12px' }}>
                        Read Article
                      </Link>
                    </div>
                  </div>
                  
                  <div className="feat-card-small">
                    <div className="feat-img-wrap-small">
                      <Link href={`/insights/${featuredBlogs[2].id}`} className="block-link" style={{ width: '100%', height: '100%', display: 'block' }}>
                        <Image src={featuredBlogs[2].image} alt={featuredBlogs[2].title} fill className="feat-img" style={{ objectFit: 'cover' }} />
                      </Link>
                    </div>
                    <div className="feat-content-small">
                      <h3 className="feat-title-small">{featuredBlogs[2].title}</h3>
                      <p className="feat-date">{featuredBlogs[2].date}</p>
                      <Link href={`/insights/${featuredBlogs[2].id}`} className="btn-outline" style={{ marginTop: '12px' }}>
                        Read Article
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Latest Blogs */}
          <section className="latest-section">
            <h2 className="section-title">Latest Blogs</h2>
            <p className="section-subtitle">
              Your go-to spot for fresh ideas, expert tips, and breakthrough insights in the digital world.
            </p>

            <div className="latest-grid">
              {currentDisplayBlogs.map((blog) => (
                <div key={blog.id} className="latest-card">
                  <div className="latest-img-wrap">
                    <Image src={blog.image} alt={blog.title} fill className="latest-img" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="latest-card-content">
                    <h3 className="latest-title">{blog.title}</h3>
                    <p className="latest-date">{blog.date}</p>
                    <Link href={`/insights/${blog.id}`} className="btn-outline">
                      Read Article
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-btn" 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-info">Page {currentPage} of {totalPages}</span>
                <button 
                  className="page-btn" 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
        .insights-hub-page, .insights-hub-page * {
          font-family: "Satoshi", sans-serif !important;
          font-weight: 400 !important;
        }

        .insights-hub-page {
          min-height: 100vh;
          background: #ffffff;
          padding-bottom: 100px;
          font-family: "Satoshi", sans-serif;
        }

        /* Hero Section */
        .hub-hero {
          text-align: center;
          padding: 100px 20px 80px;
          max-width: 900px;
          margin: 0 auto;
        }

        .hub-title {
          font-size: 48px;
          font-weight: 800;
          color: #000;
          margin-bottom: 24px;
        }

        .hub-subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: #4b5563;
          margin-bottom: 40px;
          padding: 0 40px;
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
          font-size: 16px;
          outline: none;
          color: #111827;
          transition: border-color 0.2s ease;
        }

        .hub-search-input:focus {
          border-color: #0052ff;
        }

        .hub-search-input::placeholder {
          color: #9ca3af;
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
          justify-content: center;
          gap: 16px;
        }

        .social-text {
          font-size: 15px;
          font-weight: 600;
          color: #374151;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .s-icon {
          color: #000;
          transition: transform 0.2s ease, opacity 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .s-icon:hover {
          transform: translateY(-2px);
          opacity: 0.8;
        }

        .s-icon.fb { color: #1877F2; }
        .s-icon.ig { color: #E4405F; }
        .s-icon.pin { color: #E60023; }
        .s-icon.yt { color: #FF0000; }
        .s-icon.li { color: #0A66C2; }

        /* Shared Section Styles */
        .featured-section, .latest-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 400;
          text-align: center;
          color: #000;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 15px;
          color: #4b5563;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 48px;
          line-height: 1.6;
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
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 12px;
          color: #111827;
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
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 8px;
          color: #111827;
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

        .feat-date, .latest-date {
          font-size: 13px;
          color: #6b7280;
          font-weight: 400;
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
          transition: box-shadow 0.2s ease, transform 0.2s ease;
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
          font-size: 18px;
          font-weight: 400;
          margin-bottom: 12px;
          color: #111827;
          line-height: 1.4;
        }

        .latest-date {
          margin-bottom: 24px;
        }

        .btn-outline {
          margin-top: auto;
          display: inline-block;
          width: max-content;
          padding: 8px 20px;
          border: 1.5px solid #9433e9 !important;
          color: #9433e9 !important;
          border-radius: 6px;
          font-weight: 400;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-outline:hover {
          background: #9433e9 !important;
          color: #fff !important;
        }

        /* Pagination */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 48px;
        }

        .page-btn {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          background: #fff;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 400;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: "Satoshi", sans-serif;
        }

        .page-btn:hover:not(:disabled) {
          border-color: #9433e9;
          color: #9433e9;
        }

        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f9fafb;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 400;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
          .latest-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .hub-title {
            font-size: 36px;
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
          .featured-section, .latest-section {
            padding: 0 20px;
          }
        }
      `}</style>
    </div>
  );
}
