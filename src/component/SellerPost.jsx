import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SellerPost.css';

const SellerPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || user.userType !== 'seller') {
        navigate('/login');
        return;
      }

      const sellerId = user._id;
      try {
        const response = await fetch(`http://localhost:3000/api/posts/user/${sellerId}`);
        const result = await response.json();
        console.log(result)

        if (response.ok) {
          setPosts(result);
        } else {
          setError(result.message || 'Failed to fetch posts');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        console.error('Error:', error);
      }
    };

    fetchPosts();
  }, [navigate]);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post._id !== postId));
      } else {
        const result = await response.json();
        setError(result.message || 'Failed to delete post');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="view-posts-container">
      <h1>Your Posts</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Flat No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/post/${post._id}`}>{post.FlatNo}</Link>
              </td>
              <td>
                <div class="action">
                    <button onClick={() => navigate(`/EditPost/${post._id}`)}>Edit</button>
                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPost;
