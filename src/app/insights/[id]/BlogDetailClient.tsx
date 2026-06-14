"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { Blog } from "@/types/insights";

/* ── Content renderer (placed inside <main> by the server component) ── */
export function ContentRenderer({ html }: { html: string }) {
  return (
    <div
      className="content-wrapper rich-text ck-content text-wrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

interface BlogDetailClientProps {
  blog: Blog;
}

/* ── Sidebar (left column) — default export ── */
export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const [tocItems, setTocItems] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let cleanupScroll: (() => void) | undefined;

    const frameId = window.requestAnimationFrame(() => {
      const headings = Array.from(
        document.querySelectorAll(".content-wrapper h2, .content-wrapper h3")
      );
      const items = headings.map((heading, index) => {
        const id = heading.id || `heading-${index}`;
        heading.id = id;
        return {
          id,
          text: (heading as HTMLElement).innerText,
          level: parseInt(heading.tagName.substring(1)),
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
      handleScroll();
      cleanupScroll = () => window.removeEventListener("scroll", handleScroll);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      cleanupScroll?.();
    };
  }, [blog.documentId]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const shareOnFacebook = () => {
    const url = blog.facebookLink || window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  };

  const shareOnTwitter = () => {
    const url = blog.twitterLink || window.location.href;
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(blog.title)}`, "_blank");
  };

  const shareOnPinterest = () => {
    const url = blog.pinterestLink || window.location.href;
    window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`, "_blank");
  };

  const shareOnLinkedIn = () => {
    const url = blog.linkedinLink || window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: blog.title, url: window.location.href });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <aside className="left-sidebar">
        <div className="social-share">
          <button className="social-btn" onClick={handleNativeShare} title="Share">
            <IoShareSocialOutline size={22} color="#000" />
          </button>
          <button className="social-btn facebook" onClick={shareOnFacebook} title="Share on Facebook">
            <FaFacebookF size={18} />
          </button>
          <button className="social-btn twitter" onClick={shareOnTwitter} title="Share on Twitter">
            <FaTwitter size={18} />
          </button>
          <button className="social-btn pinterest" onClick={shareOnPinterest} title="Share on Pinterest">
            <FaPinterestP size={18} />
          </button>
          <button className="social-btn linkedin" onClick={shareOnLinkedIn} title="Share on LinkedIn">
            <FaLinkedinIn size={18} />
          </button>
        </div>

        <div className="sidebar-content">
          <h3 className="sidebar-title">Table of Contents</h3>
          {tocItems.length > 0 ? (
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
          ) : (
            <p className="toc-empty">No sections found.</p>
          )}
        </div>
    </aside>
  );
}
