import React, { useState, useEffect } from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function PostCard({ $id, title, featuredImage, content }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const loadImage = async () => {
      const src = appwriteService.getFilePreview(featuredImage);
      setImageSrc(src);
      setIsLoading(false);
    };

    loadImage();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="post-card bg-gray-100 rounded-xl p-4 w-full h-80 flex flex-col">
        <div className="image-container mb-4 h-40 w-full overflow-hidden rounded-xl">
          {isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <img src={imageSrc} alt={title} className="w-full h-full object-cover" />
          )}
        </div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-xs font-serif text-gray-700 overflow-hidden text-ellipsis line-clamp-2">
          {parse(content)}
        </p>
      </div>
    </Link>
  );
}

export default PostCard;
