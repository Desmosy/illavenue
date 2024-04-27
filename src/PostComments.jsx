import React, { useState, useEffect } from 'react';
import { supabaseClient } from './supabaseClient.jsx';

const PostComments = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabaseClient
        .from('comments')
        .select('*')
        .eq('post_id', postId);
      if (error) {
        console.error(error);
      } else {
        setComments(data);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabaseClient
      .from('comments')
      .insert([{ post_id: postId, content: comment }]);
    if (error) {
      console.error(error);
    } else {
      setComment('');
      fetchComments(); // <-- Fixed typo here, changed `fetchComments` to `fetchComments()`
      console.log('Comment posted successfully!');
    }
  };

  return (
    <div className="comments">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
        />
        <br></br>
        <button type="submit">Post Comment</button>
      </form>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
