import React, { useState, useEffect } from "react";
import LayoutSwitcher from "./LayoutSwitcher";
import PostCard from "./PostCard";

const AUTHORS = ["All", "Alice", "Bob", "Charlie"];

function fetchPosts({ author, page, pageSize }) {
  // Simulate API - in prod: GET /api/posts?author&offset
  const allPosts = [
    { id: 1, title: "Welcome Post", author: "Alice", summary: "Intro to the blog platform." },
    { id: 2, title: "React Patterns", author: "Bob", summary: "Reusable React design techniques." },
    { id: 3, title: "DevOps Tips", author: "Charlie", summary: "Improve app deployments." },
    { id: 4, title: "Advanced Hooks", author: "Alice", summary: "Deep dive into React hooks." },
    { id: 5, title: "Testing React", author: "Bob", summary: "Best practices for testing." },
    { id: 6, title: "Scaling Node.js", author: "Charlie", summary: "Optimization tricks." },
    { id: 7, title: "Docker Essentials", author: "Alice", summary: "Containerize your apps." },
    { id: 8, title: "UI/UX Basics", author: "Bob", summary: "Design better interfaces." },
    { id: 9, title: "Redux in Practice", author: "Charlie", summary: "A hands-on walkthrough." },
    { id: 10, title: "CI/CD Setup", author: "Alice", summary: "Automate deployments!" },
    { id: 11, title: "Accessibility", author: "Bob", summary: "Inclusive web design." },
    // Add more as needed...
  ];
  let filtered = allPosts;
  if (author && author !== "All") {
    filtered = filtered.filter((p) => p.author === author);
  }
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        posts: filtered.slice(start, end),
        total
      });
    }, 600); // Simulates network latency
  });
}

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [author, setAuthor] = useState("All");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const totalPages = Math.ceil(total / pageSize);

  // INTENTIONAL BUG: incorrect/missing deps, so effect re-runs unexpectedly, causing duplicate fetches
  useEffect(() => {
    setLoading(true);
    fetchPosts({ author, page, pageSize }).then(({ posts, total }) => {
      setPosts(posts);
      setTotal(total);
      setLoading(false);
    });
  }, [author, page]); // MISSING: view, setPageSize, etc. // Not always re-fetching correctly

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
    setPage(1);
  };

  const handlePageChange = (delta) => {
    setPage((p) => Math.max(1, Math.min(totalPages, p + delta)));
  };

  const handleLayoutChange = (layout) => {
    setView(layout);
  };

  return (
    <div>
      <LayoutSwitcher view={view} onChange={handleLayoutChange} />
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="author-select" style={{ fontWeight: "bold" }}>Filter by Author: </label>
        <select id="author-select" value={author} onChange={handleAuthorChange}>
          {AUTHORS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div style={{ minHeight: 260 }}>
        {loading && <div data-testid="loading">Loading posts...</div>}
        {!loading && posts.length === 0 && <div>No posts found.</div>}

        {view === "list" && (
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {posts.map((post, idx) => (
              <li key={idx} style={{ borderBottom: "1px solid #ddd", padding: 16 }}>
                <div style={{ fontWeight: "bold", fontSize: 18 }}>{post.title}</div>
                <div style={{ color: "#666", fontSize: 14 }}>By: {post.author}</div>
                <div style={{ marginTop: 4 }}>{post.summary}</div>
              </li>
            ))}
          </ul>
        )}
        {view === "grid" && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {posts.map((post, idx) => (
              <PostCard post={post} key={idx} />
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 24, display: "flex", alignItems: "center" }}>
        <button onClick={() => handlePageChange(-1)} disabled={page === 1}>
          Prev
        </button>
        <span style={{ margin: "0 14px" }}>
          Page {page} / {totalPages || 1}
        </span>
        <button onClick={() => handlePageChange(1)} disabled={page === totalPages || totalPages === 0}>
          Next
        </button>
      </div>
    </div>
  );
}
