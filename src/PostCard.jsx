import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="created-at">Created at: {new Date(post.created_at).toLocaleString()}</p>
      <p className="upvotes">🔥{post.upvotes}</p>
    </div>
  );
};

export default PostCard;