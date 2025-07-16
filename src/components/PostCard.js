import React from "react";

export default function PostCard({ post }) {
  return (
    <div style={{ border: "1px solid #999", borderRadius: 8, background: "#fafafa", padding: 16, margin: 8, minWidth: 220 }}>
      <h3 style={{ marginTop: 0 }}>{post.title}</h3>
      <div style={{ fontSize: 14, color: "#666" }}>
        <strong>By:</strong> {post.author}
      </div>
      <div>{post.summary}</div>
    </div>
  );
}
