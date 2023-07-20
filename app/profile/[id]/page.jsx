'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';

const page = ({ params, searchParams }) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { data: session } = useSession();
  const username = searchParams.name;
  const promptId = params.id;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${promptId}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${promptId.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => p._id !== searchParams);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Profile
      name={`${username.substring(0, 1).toUpperCase()}${username.substring(1, username.length)}`}
      desc={`Welcome to {username} personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination!`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default page;
