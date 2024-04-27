import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabaseClient } from './supabaseClient';
import PostComments from './PostComments';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabaseClient
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error(error);
      } else {
        setPost(data);
        setEditTitle(data.title);
        setEditContent(data.content);
        setEditImageUrl(data.image_url);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const { error } = await supabaseClient.from('posts').delete().eq('id', id);
    if (error) {
      console.error(error);
    } else {
      navigate('/');
      console.log('Post deleted successfully!');
    }
  };

  const handleUpdate = async () => {
    const { data, error } = await supabaseClient
      .from('posts')
      .update({ title: editTitle, content: editContent, image_url: editImageUrl })
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setEditMode(false);
      setPost(data[0]);
      console.log('Post updated successfully!');
    }
  };

  const handleUpvote = async () => {
    const { data, error } = await supabaseClient
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id);
    if (error) {
      console.error(error);
    } else {
      setPost({ ...post, upvotes: post.upvotes + 1 });
      console.log('Post upvoted successfully!');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-details">
      {editMode ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <input
            type="text"
            value={editImageUrl}
            onChange={(e) => setEditImageUrl(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Post</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <div>
            <h2>Title: {post.title}</h2>
          </div>
          <div>
            <p>Content: {post.content}</p>
          </div>
          <div>
            {post.image_url && <img src={post.image_url} alt={post.title} />}
          </div>
          <div>
            <button onClick={handleUpvote}>🔥 {post.upvotes} </button>
            <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
          </div>
          <div>
            <button className='edit' onClick={() => setEditMode(true)}>Edit Post</button>
            <button onClick={handleDelete}>Delete Post</button>
          </div>
          <PostComments postId={id} />
        </div>
      )}
    </div>
  );
};

export default PostDetails;
