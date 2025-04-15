// app/page.js (SSR Example - Server-Side Rendering with Button)

import React, { useState } from 'react';

// SSR-like behavior using server-side data fetching
async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return posts;
}

// 'use client'
export default async function HomePage() {
  const posts = await fetchPosts();  // Data fetched on server-side

  const [clicked, setClicked] = useState(false);  // State for button interactivity

  const handleClick = () => {
    setClicked(!clicked);  // Toggle button state
  };

  return (
    <div>
      <h1>Server-Side Rendered Content</h1>
      <p>Data from server: {posts[0]?.title}</p>

      {/* Button with onClick functionality */}
      <button onClick={handleClick}>
        {clicked ? 'Clicked!' : 'Click me'}
      </button>
    </div>
  );
}
