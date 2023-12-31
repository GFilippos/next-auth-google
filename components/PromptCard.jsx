'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import tickImg from '../public/icons/tick.svg';
import copyImg from '../public/icons/copy.svg';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [coppied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const creatorId = post?._id;
  const creatorName = post?.creator.username;
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  };
  return (
    <div className="prompt_card">
      <Link href={`/profile/${creatorId}?name=${creatorName}`}>
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
              <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
            </div>
          </div>
          <div className="copy_btn" onClick={handleCopy}>
            <Image src={coppied === post.prompt ? tickImg : copyImg} width={24} height={24} alt="prompt-img" />
          </div>
        </div>
      </Link>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>
            Edit
          </p>
          <p className="font-inter text-sm red_gradient cursor-pointer" onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
