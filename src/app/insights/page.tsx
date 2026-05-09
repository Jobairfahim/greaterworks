"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function InsightsPage() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const introductionRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const updatesRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useMemo(() => ({
    introduction: introductionRef,
    guides: guidesRef,
    updates: updatesRef,
  }), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  const scrollToSection = (sectionId: string) => {
    let element: HTMLElement | null = null;
    if (sectionId === "introduction") element = introductionRef.current;
    else if (sectionId === "guides") element = guidesRef.current;
    else if (sectionId === "updates") element = updatesRef.current;
    
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setFullName("");
        setEmail("");
      }, 3000);
    }
  };

  const guides = [
    {
      id: "scalable-web-apps",
      title: "How to Build a Scalable Web Application",
      description: "Learn core principles of scalable architecture, from database design to deployment strategies.",
    },
    {
      id: "mern-stack",
      title: "Getting Started with MERN Stack Development",
      description: "A practical beginner-friendly guide to building full-stack applications using MongoDB, Express, React, and Node.js.",
    },
    {
      id: "ui-ux-practices",
      title: "UI/UX Best Practices for Modern Web Apps",
      description: "Design intuitive and engaging user experiences that convert and retain users.",
    },
    {
      id: "api-design",
      title: "API Design: Best Practices for Developers",
      description: "Build clean, secure, and efficient APIs that scale with your application.",
    },
    {
      id: "performance-optimization",
      title: "Optimizing Website Performance",
      description: "Techniques to improve loading speed, SEO ranking, and overall user experience.",
    },
  ];

  const updates = [
    {
      id: "web-dev-trends",
      title: "Top Web Development Trends in 2026",
      description: "Explore the latest technologies shaping the future of web development.",
    },
    {
      id: "ai-development",
      title: "The Rise of AI in Software Development",
      description: "How AI tools are transforming the way developers build and deploy applications.",
    },
    {
      id: "cloud-trends",
      title: "Cloud Computing Trends You Should Know",
      description: "Key updates in cloud infrastructure, DevOps, and scalability.",
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity in Modern Applications",
      description: "Emerging threats and how to protect your systems effectively.",
    },
    {
      id: "ecommerce-future",
      title: "The Future of E-commerce Platforms",
      description: "Innovations changing how online businesses operate and grow.",
    },
  ];

  return (
    <div className="insights-page">
      {/* Hero Section */}
      {/* <section className="hero-section">
        <div className="w-layout-blockcontainer container-3 hero-banner w-container">
          <div className="home-banner-video-wrap">
            <div className="home-banner-video-bg-color" />
            <div className="glass-filter services" />
            <div className="glass-overlay services" />
            <div className="glass-specular services" />
          </div>
          <div className="hero-banner-content-wrap">
            <div className="hero-banner-content-left">
              <div className="section-head-content-subtitle subtitle-primary-content">
                <div className="section-head-subtitle-dot" />
                <p className="section-head-subtitle-content hero-primary-content">Expert Insights & Resources</p>
              </div>
              <h2 className="hero-banner-title">Beyond Technology, We Build Trust</h2>
              <p className="hero-banner-content-description">Stay ahead with actionable guides, expert tips, and latest industry trends. Whether you&apos;re building a product, scaling a business, or exploring new technologies, our insights are designed to help you make smarter decisions.</p>
              <div className="button-wrap hero-banner-button-wrap">
                <Link href="#guides" className="button-primary-3 hero-banner w-inline-block">
                  <div className="text-block-16">Explore Guides</div>
                  <Image 
                  alt="arrow-top-right" 
                  src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/68dd105094d90e0a289e4185_arrow-top-right-white.svg" 
                  width={16} 
                  height={16} 
                  className="button-icon" 
                />
                </Link>
                <Link href="/contact-us" data-gn-book-meeting="modal" data-w-id="617f6bfb-f59f-e3a1-a068-c20d1b82a49a" className="button-secondary-light hero-secondary-button w-inline-block">
                  <div className="button-secondary-light-text-2">Get Started</div>
                  <div className="arrows-container cta">
                    <Image 
                      alt="Icon" 
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e4382716cdf25ad0f3d5_date-icon-light.svg" 
                      width={16} 
                      height={16} 
                      className="dark-arrow _16" 
                    />
                    <Image 
                      alt="Icon" 
                      src="https://cdn.prod.website-files.com/68d276a2319df5bdcc752026/6937e33ae69eb8ce6ab3de51_date-icon-dark.svg" 
                      width={16} 
                      height={16} 
                      className="arrow-button _16" 
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="hero-banner-content-right">
              <a href="#" className="video-player-wrap responsive-style w-inline-block w-lightbox">
                <div className="play-button-wrap">
                  <div className="play-btn">
                    <Image src="https://res.cloudinary.com/dsoilebvu/image/upload/v1777057659/poly_f74kga.svg" loading="lazy" alt="Play-icon" width={48} height={48} className="play-icon" />
                  </div>
                </div>
                <div className="intro-text">Watch Intro</div>
              </a>
            </div>
          </div>
        </div>
      </section> */}

      <div className="insights-content-wrapper">
        {/* Sidebar */}
        <aside className="insights-sidebar">
          <div className="sidebar-content">
            <h3 className="sidebar-title">Table of Contents</h3>
            <nav className="sidebar-nav">
              <button
                onClick={() => scrollToSection("introduction")}
                className={`sidebar-link ${activeSection === "introduction" ? "active" : ""}`}
              >
                Introduction
              </button>
              <button
                onClick={() => scrollToSection("guides")}
                className={`sidebar-link ${activeSection === "guides" ? "active" : ""}`}
              >
                Guides
              </button>
              <button
                onClick={() => scrollToSection("updates")}
                className={`sidebar-link ${activeSection === "updates" ? "active" : ""}`}
              >
                Updates
              </button>
            </nav>

            {activeSection === "guides" && (
              <div className="subsection-nav">
                <button
                  onClick={() => {
                    const element = document.getElementById("scalable-web-apps");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  Scalable Web Apps
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("mern-stack");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  MERN Stack Guide
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("ui-ux-practices");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  UI/UX Best Practices
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("api-design");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  API Design
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("performance-optimization");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  Performance Optimization
                </button>
              </div>
            )}

            {activeSection === "updates" && (
              <div className="subsection-nav">
                <button
                  onClick={() => {
                    const element = document.getElementById("web-dev-trends");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  Web Dev Trends
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("ai-development");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  AI in Development
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("cloud-trends");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  Cloud Trends
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("cybersecurity");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  Cybersecurity
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById("ecommerce-future");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="subsection-link"
                >
                  E-commerce Future
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="insights-main">
          {/* Introduction Section */}
          <section ref={introductionRef} className="insights-section">
            <h2 className="section-title">Introduction</h2>
            <p className="section-description">
              Stay ahead with actionable guides, expert tips, and latest industry trends. Whether you&apos;re building a product, 
              scaling a business, or exploring new technologies, our insights are designed to help you make smarter decisions.
            </p>
          </section>

          {/* Guides Section */}
          <section ref={guidesRef} className="insights-section">
            <h2 className="section-title">Guides (How-tos, Tutorials)</h2>
            <div className="insights-grid">
              {guides.map((guide) => (
                <article key={guide.id} id={guide.id} className="insight-card">
                  <h3 className="insight-title">{guide.title}</h3>
                  <p className="insight-description">{guide.description}</p>
                  <Link href="#" className="insight-link">
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* Updates Section */}
          <section ref={updatesRef} className="insights-section">
            <h2 className="section-title">Updates (News, Trends)</h2>
            <div className="insights-grid">
              {updates.map((update) => (
                <article key={update.id} id={update.id} className="insight-card">
                  <h3 className="insight-title">{update.title}</h3>
                  <p className="insight-description">{update.description}</p>
                  <Link href="#" className="insight-link">
                    Read More →
                  </Link>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Subscription Section */}
      <section className="insights-subscription">
        <div className="container">
          <div className="subscription-content">
            <h2 className="subscription-title">Stay Updated with Insights</h2>
            <p className="subscription-description">
              Get the latest guides, tips, and industry updates delivered straight to your inbox.
            </p>
            
            {isSubscribed ? (
              <div className="subscription-success">
                <h3>Thank you for subscribing!</h3>
                <p>You&apos;ll receive our latest insights soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="subscription-form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                />
                <button type="submit" className="subscription-button">
                  Subscribe Now
                </button>
                <p className="privacy-note">
                  We respect your privacy. No spam, only valuable insights.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .insights-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .insights-hero {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 80px 0;
          text-align: center;
        }

        .insights-hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .insights-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 20px;
          font-family: "Satoshi", sans-serif;
        }

        .insights-subtitle {
          font-size: 20px;
          line-height: 1.6;
          opacity: 0.9;
          font-family: "Satoshi", sans-serif;
        }

        /* Content Layout */
        .insights-content-wrapper {
          display: flex;
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
          gap: 40px;
        }

        .insights-sidebar {
          width: 280px;
          position: sticky;
          top: 100px;
          height: fit-content;
        }

        .sidebar-content {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #1a202c;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .sidebar-link {
          text-align: left;
          padding: 12px 16px;
          border: none;
          background: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #4a5568;
          font-weight: 500;
        }

        .sidebar-link:hover {
          background: #f7fafc;
          color: #2d3748;
        }

        .sidebar-link.active {
          background: #9633ec !important;
          color: white !important;
        }

        .subsection-nav {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-left: 16px;
          padding-left: 16px;
          border-left: 2px solid #e2e8f0;
        }

        .subsection-link {
          text-align: left;
          padding: 8px 12px;
          border: none;
          background: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #718096;
          font-weight: 400;
        }

        .subsection-link:hover {
          background: #f7fafc;
          color: #4a5568;
        }

        .insights-main {
          flex: 1;
          min-width: 0;
        }

        .insights-section {
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 20px;
          color: #1a202c;
          font-family: "Satoshi", sans-serif;
        }

        .section-description {
          font-size: 18px;
          line-height: 1.7;
          color: #4a5568;
          margin-bottom: 30px;
          font-family: "Satoshi", sans-serif;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .insight-card {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .insight-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .insight-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1a202c;
          font-family: "Satoshi", sans-serif;
        }

        .insight-description {
          font-size: 16px;
          line-height: 1.6;
          color: #4a5568;
          margin-bottom: 20px;
          font-family: "Satoshi", sans-serif;
        }

        .insight-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          transition: color 0.2s ease;
        }

        .insight-link:hover {
          color: #5a67d8;
        }

        /* Subscription Section */
        .insights-subscription {
          background: #ffffffff;
          color: white;
          padding: 80px 0;
        }

        .subscription-content {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
        }

        .subscription-title {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 16px;
          font-family: "Satoshi", sans-serif;
        }

        .subscription-description {
          font-size: 18px;
          line-height: 1.6;
          margin-bottom: 40px;
          opacity: 0.9;
          font-family: "Satoshi", sans-serif;
        }

        .subscription-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-input {
          padding: 16px 20px;
          border: 1px solid #726e6eff;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: #757575ff;
          font-size: 16px;
          transition: all 0.2s ease;
        }

        .form-input::placeholder {
          color: #757575ff;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.15);
        }

        .subscription-button {
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .subscription-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .privacy-note {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 16px;
          font-family: "Satoshi", sans-serif;
        }

        .subscription-success {
          text-align: center;
          padding: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .subscription-success h3 {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #68d391;
        }

        .subscription-success p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .insights-title {
            font-size: 36px;
          }

          .insights-content-wrapper {
            flex-direction: column;
            padding: 40px 20px;
          }

          .insights-sidebar {
            width: 100%;
            position: static;
            margin-bottom: 30px;
          }

          .insights-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .insight-card {
            padding: 20px;
          }

          .subscription-form {
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}
