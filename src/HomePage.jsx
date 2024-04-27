import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabaseClient } from './supabaseClient';
import PostCard from './PostCard';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc'); 

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabaseClient.from('posts').select('id, title, created_at, upvotes');
  
      if (sortOrder === 'upvotesAsc') {
        query = query.order('upvotes', { ascending: true });
      } else if (sortOrder === 'upvotesDesc') {
        query = query.order('upvotes', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: sortOrder === 'asc' });
      }
  
      const { data, error } = await query;
      
      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, [sortOrder]);
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Illustration Forum</h1>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select value={sortOrder} onChange={handleSortChange} className="sort-select">
          <option value="asc">Sort by Date (Ascending)</option>
          <option value="desc">Sort by Date (Descending)</option>
          <option value="upvotesAsc">Sort by Upvotes (Ascending)</option>
          <option value="upvotesDesc">Sort by Upvotes (Descending)</option>
        </select>
      </header>

      {/* Render each post using the PostCard component */}
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-card-item">
          <Link to={`/post/${post.id}`} className="post-link">
            <PostCard post={post} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
