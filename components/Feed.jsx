'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

export const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, i) => (
        <PromptCard key={i} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const tempPosts = posts.filter((post) => post.prompt?.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredPosts(tempPosts);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          placeholder="Search for a username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList data={filteredPosts || posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
