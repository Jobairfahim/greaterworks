"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/types/insights";

export default function BlogSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Blog[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    setShowResults(true);

    try {
      const encodedQuery = encodeURIComponent(searchQuery);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?filters[title][$containsi]=${encodedQuery}&populate[image]=true&populate[authorImage]=true&pagination[pageSize]=10&pagination[page]=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Search failed:", response.statusText);
        setSearchResults([]);
        return;
      }

      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Error searching blogs:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-card">
      <div className="search-icon-box">
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
        </svg>
      </div>

      <h3 className="search-title">Search Blogs</h3>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input w-input"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="search-button w-button"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      {showResults && (
        <div className="search-results">
          {searchResults.length > 0 ? (
            <ul className="results-list">
              {searchResults.map((blog) => (
                <li key={blog.documentId} className="result-item">
                  <Link href={`/insights/${blog.slug || blog.documentId}`}>
                    <div className="result-content">
                      <div className="result-title">{blog.title}</div>
                      <div className="result-excerpt">{blog.excerpt || blog.title}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-results">
              {searchQuery.trim() ? "No blogs found" : "Enter a search term"}
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .search-card {
          background: #fafafa;
          border-radius: 8px;
          padding: 24px 20px;
          margin-bottom: 24px;
        }

        .search-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          background: #f5f0ff;
          color: #9433e9;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .search-title {
          margin-bottom: 16px;
        }

        .search-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .search-input {
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(148, 51, 233, 0.1);
        }

        .search-button {
          padding: 12px 24px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .search-button:hover:not(:disabled) {
          background: #8129d1;
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .search-results {
          margin-top: 16px;
          border-top: 1px solid #e2e8f0;
          padding-top: 16px;
        }

        .results-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
        }

        .results-list::-webkit-scrollbar {
          width: 6px;
        }

        .results-list::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .result-item {
          padding: 0;
        }

        .result-item a {
          display: block;
          padding: 12px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .result-item a:hover {
          background: #f0e7ff;
          border-color: #e9d5ff;
        }

        .result-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .result-excerpt {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .no-results {
          padding: 16px;
          text-align: center;
          background: #f8fafc;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
