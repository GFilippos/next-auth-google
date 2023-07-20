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
  const [userInput, setUserInput] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    filterPostsByUserInput();
  }, [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setUserInput(true);
  };

  const filterPostsByUserInput = () => {
    const tempPosts = posts.filter(
      (post) =>
        post.prompt?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.tag?.toLowerCase().includes(searchText.toLowerCase()) ||
        post.creator?.username.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(tempPosts);
  };

  const handleTagClick = (e) => {
    setSearchText(e);
    setUserInput(true);
  };
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
      <PromptCardList data={userInput ? filteredPosts : posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
