import React, { useState, useEffect, useRef } from 'react';
import { supabaseClient } from './supabaseClient.jsx';


const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabaseClient.from('posts').insert([{ title, content, image_url: imageUrl }]);

    if (error) {
      console.error(error);
    } else {
      setTitle('');
      setContent('');
      setImageUrl('');
      console.log('Post created successfully!');
    }
  };

  useEffect(() => {
    const titleInput = formRef.current.querySelector('input[type="text"]:first-of-type');
    const createPostForm = formRef.current;

    titleInput.addEventListener('click', () => {
      createPostForm.classList.toggle('show-all');
    });
  }, []);

  return (
    <div className="post-form">
    <form className="create-post-form" onSubmit={handleSubmit} ref={formRef}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="input-group">
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <button type="submit">Create Post</button>
    </form>
    </div>
  );
};

export default CreatePostForm;