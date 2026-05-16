"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInsightById } from "@/data/insightsData";
import { use, useState, useEffect, useRef, useMemo } from "react";
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";

export default function InsightPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const insight = getInsightById(resolvedParams.id);

  const [tocItems, setTocItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Generate TOC items from H2 and H3 headings
    const headings = Array.from(document.querySelectorAll('.content-wrapper h2, .content-wrapper h3'));
    const items = headings.map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      heading.id = id; // Ensure heading has an ID
      return {
        id,
        text: (heading as HTMLElement).innerText,
        level: parseInt(heading.tagName.substring(1))
      };
    });
    setTocItems(items);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;

      let currentActive = "";
      headings.forEach((heading) => {
        const { offsetTop } = heading as HTMLElement;
        if (scrollPosition >= offsetTop) {
          currentActive = heading.id;
        }
      });
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [insight]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (!insight) {
    notFound();
  }

  return (
    <div className="insight-post-page">
      <div className="blog-layout-grid">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="social-share">
            <button className="social-btn"><IoShareSocialOutline size={22} color="#000" /></button>
            <button className="social-btn facebook"><FaFacebookF size={18} /></button>
            <button className="social-btn twitter"><FaTwitter size={18} /></button>
            <button className="social-btn pinterest"><FaPinterestP size={18} /></button>
            <button className="social-btn linkedin"><FaLinkedinIn size={18} /></button>
          </div>

          <div className="sidebar-content">
            <h3 className="sidebar-title">Table of Contents</h3>
            <ul className="toc-list">
              {tocItems.map((item) => (
                <li key={item.id} className={item.level === 3 ? "toc-sub-item" : ""}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`toc-link ${activeSection === item.id ? "active" : ""}`}
                  >
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="center-content">
          <div className="breadcrumbs">
            <Link href="/">HOME</Link> / <Link href="/insights">INSIGHTS</Link>
          </div>

          <h1 className="article-title">{insight.title}</h1>

          <div className="author-meta-block">
            <div className="author-avatar">
              <Image src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68e51d8ba178421e5a3e8949_header%20menu%20image.jpg" alt="Author" width={48} height={48} className="avatar-img" />
            </div>
            <div className="author-info">
              <div className="author-name">{insight.author || "Jobair Fahim"}</div>
              <div className="author-details">
                {insight.date && <span>{insight.date}</span>}
                {insight.date && <span className="meta-dot">·</span>}
                <span>Updated on: {insight.date || "April 20, 2026"}</span>
                {insight.readTime && <span className="meta-dot">·</span>}
                {insight.readTime && <span>{insight.readTime}</span>}
              </div>
            </div>
          </div>

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

          <div className="content-wrapper">
            <div id="intro">
              <p className="content-text">
                {insight.content || "Welcome to our comprehensive guide on digital transformation and modern implementation strategies. In today's fast-paced tech landscape, understanding the nuances of how systems interact is more critical than ever."}
              </p>
            </div>

            <div id="basics">
              <h2 className="content-heading">Understanding the Basics</h2>
              <p className="content-text">
                Before diving into complex implementations, one must grasp the underlying architecture that powers modern web applications. This foundation ensures that future scaling remains manageable.
              </p>

              <h3 className="content-sub-heading">Key Fundamentals</h3>
              <p className="content-text">
                The fundamentals involve stateless architecture, efficient data fetching, and robust error handling. By focusing on these, you minimize the "technical debt" that often plagues rapid development cycles.
              </p>

              <h3 className="content-sub-heading">Core Pillars of Design</h3>
              <p className="content-text">
                Security, performance, and accessibility are not just checkboxes; they are the pillars upon which every successful digital product is built. Neglecting even one can lead to significant long-term issues.
              </p>

              <div className="content-quote">
                "Innovation distinguishes between a leader and a follower. Building robust applications is the cornerstone of digital innovation."
              </div>
            </div>

            <div id="implementation">
              <h2 className="content-heading">Next Steps and Implementation</h2>
              <p className="content-text">
                Moving from theory to practice requires a disciplined approach. We break this down into three distinct phases to ensure clarity and accountability throughout the development lifecycle.
              </p>

              <h3 className="content-sub-heading">Strategic Planning</h3>
              <p className="content-text">
                Strategic planning involves resource allocation, setting realistic timelines, and identifying potential bottlenecks before they occur. It's about being proactive rather than reactive.
              </p>

              <h3 className="content-sub-heading">Execution Phase</h3>
              <p className="content-text">
                The execution phase is where the heavy lifting happens. It involves agile workflows, continuous integration, and frequent peer reviews to maintain code quality.
              </p>

              <h3 className="content-sub-heading">Monitoring & Optimization</h3>
              <p className="content-text">
                Launch is just the beginning. Post-launch monitoring and iterative optimization are what turn a good product into a great one. Use data-driven insights to guide your next moves.
              </p>
            </div>

            <div id="conclusion">
              <h2 className="content-heading">Conclusion</h2>
              <p className="content-text">
                Successfully navigating the digital landscape requires a balance of foundational knowledge and flexible implementation. By following a structured approach, you set yourself up for sustained growth and innovation.
              </p>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* <div className="promo-card dark">
            <div className="promo-icon dark-icon"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg></div>
            <h3 className="promo-title">Join our Affiliate<br />Program</h3>
            <p className="promo-text">Earn upto 30% commissions<br />on successful referrals.</p>
            <button className="promo-btn primary">Join Program</button>
          </div> */}

          <div className="promo-card light">
            <div className="promo-icon outline-icon"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg></div>
            <h3 className="promo-title">Stay Updated</h3>
            <p className="promo-text">Join thousands of readers<br />getting smarter every week.</p>
            <input type="email" placeholder="Email Address" className="promo-input" />
            <button className="promo-btn block">Subscribe</button>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .insight-post-page, .insight-post-page * {
          font-family: "Satoshi", sans-serif !important;
          font-weight: 400 !important;
        }

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

        .left-sidebar {
          position: sticky;
          top: 100px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .social-share {
          display: flex;
          gap: 12px;
          align-items: center;
          padding-left: 8px;
        }

        .social-btn {
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
        
        .social-btn.facebook { color: #1877F2; }
        .social-btn.twitter { color: #000000; }
        .social-btn.pinterest { color: #E60023; }
        .social-btn.linkedin { color: #0A66C2; }

        .sidebar-content {
          background: #fafafa;
          border-radius: 8px;
          padding: 24px 20px;
          max-height: calc(100vh - 150px);
          overflow-y: auto;
        }

        .sidebar-content::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-content::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .sidebar-title {
          font-size: 16px;
          font-weight: 400;
          margin-bottom: 12px;
          color: #111111 !important;
          font-family: "Satoshi", sans-serif;
        }

        .toc-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .toc-list li {
          position: relative;
          padding-left: 12px;
        }

        .toc-list li::before {
          content: '•';
          position: absolute;
          left: 0;
          top: -2px;
          color: #111111 !important;
          font-size: 16px;
        }

        .insight-post-page .toc-list .toc-link {
          text-align: left;
          padding: 0;
          border: none;
          background: none !important;
          font-size: 13px;
          line-height: 1.5;
          cursor: pointer;
          transition: color 0.2s ease;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
          font-family: "Satoshi", sans-serif;
          display: block;
          width: 100%;
          opacity: 1 !important;
          visibility: visible !important;
        }

        .toc-sub-item {
          padding-left: 16px !important;
        }

        .toc-sub-item .toc-link {
          font-size: 12px;
          color: #000000 !important;
          -webkit-text-fill-color: #000000 !important;
        }

        .toc-sub-item::before {
          content: '—' !important;
          font-size: 12px !important;
          color: #111111 !important;
        }

        .toc-link:hover {
          color: #111111 !important;
        }

        .toc-link.active {
          color: #111111 !important;
          text-decoration: underline;
          font-weight: 400 !important;
        }

        .center-content {
          min-width: 0;
        }

        .breadcrumbs {
          font-size: 12px;
          font-weight: 400;
          color: #9433e9;
          letter-spacing: 1px;
          margin-bottom: 20px;
          font-family: "Satoshi", sans-serif;
          text-transform: uppercase;
        }

        .breadcrumbs a {
          color: #9433e9;
          text-decoration: none;
        }

        .breadcrumbs a:hover {
          text-decoration: underline;
        }

        .article-title {
          font-size: 42px;
          font-weight: 400;
          color: #000;
          margin-bottom: 20px;
          line-height: 1.2;
          font-family: "Satoshi", sans-serif;
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
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .author-name {
          font-size: 16px;
          font-weight: 400;
          color: #9433e9;
          margin-bottom: 4px;
          font-family: "Satoshi", sans-serif;
        }

        .author-details {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #4b5563;
          font-family: "Satoshi", sans-serif;
        }

        .meta-dot {
          font-size: 14px;
          font-weight: 400;
          color: #9ca3af;
        }

        .featured-image-wrapper {
          width: 100%;
          margin-bottom: 40px;
          display: flex;
        }

        .featured-image {
          width: 100%;
          height: auto;
          border-radius: 12px;
          object-fit: cover;
        }

        .content-text {
          font-size: 16px;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 24px;
          font-family: "Satoshi", sans-serif;
        }

        .content-heading {
          font-size: 28px;
          font-weight: 400;
          color: #1a202c;
          margin: 40px 0 20px;
          font-family: "Satoshi", sans-serif;
        }

        .content-quote {
          font-size: 20px;
          font-style: italic;
          color: #2d3748;
          padding: 24px 32px;
          border-left: 4px solid #9433e9;
          background: #f8fafc;
          margin: 32px 0;
          border-radius: 0 12px 12px 0;
          line-height: 1.6;
        }

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

        .promo-card.dark {
          background: #000;
          color: #fff;
        }

        .promo-card.light {
          background: #fff;
          border: 1px solid #9433e9;
          color: #000;
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

        .dark-icon {
          background: #333;
          color: #fff;
        }

        .outline-icon {
          background: #f5f0ff;
          color: #9433e9;
        }

        .promo-title {
          font-size: 20px;
          font-weight: 400;
          margin-bottom: 12px;
          line-height: 1.4;
          font-family: "Satoshi", sans-serif;
        }

        .promo-text {
          font-size: 13px;
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 24px;
          font-family: "Satoshi", sans-serif;
        }

        .promo-card.light .promo-text {
          color: #4b5563;
        }

        .promo-btn {
          font-size: 15px;
          font-weight: 400;
          padding: 12px 24px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: "Satoshi", sans-serif;
        }

        .promo-btn.primary {
          background: #9433e9;
          color: white;
        }
        
        .promo-btn.primary:hover {
          background: #8129d1;
        }

        .promo-btn.block {
          width: 100%;
          background: #9433e9;
          color: white;
        }
        
        .promo-btn.block:hover {
          background: #8129d1;
        }

        .promo-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          margin-bottom: 16px;
          outline: none;
          transition: border-color 0.2s ease;
          font-family: "Satoshi", sans-serif;
        }

        .promo-input:focus {
          border-color: #9433e9;
        }
        
        @media (max-width: 1200px) {
          .blog-layout-grid {
            grid-template-columns: 200px 1fr 280px;
            gap: 24px;
          }
        }

        @media (max-width: 991px) {
          .blog-layout-grid {
            grid-template-columns: 1fr 300px;
          }
          .left-sidebar {
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
          .article-title {
            font-size: 32px;
          }
          .center-content {
            padding: 24px;
          }
        }
        .content-sub-heading {
          font-size: 20px;
          color: #2d3748;
          margin: 32px 0 16px;
          font-family: "Satoshi", sans-serif;
        }
      `}</style>
    </div>
  );
}
