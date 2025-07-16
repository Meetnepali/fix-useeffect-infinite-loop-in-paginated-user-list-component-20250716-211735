import React from "react";
import PostList from "./components/PostList";

function App() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Published Blog Posts</h1>
      <PostList />
    </div>
  );
}

export default App;
