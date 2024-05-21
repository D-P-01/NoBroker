import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './InterestedPost.css';
import house from "../assets/house.jpg";

const InterestedPost = () => {
  const [post, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterestedPosts = async () => {
      try {
        // Fetch the interested posts data from the backend
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        const result = await response.json();

        console.log(result);

        if (response.ok) {
          setPosts(result);
        } else {
          setError(result.message || 'Failed to fetch interested posts');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        console.error('Error:', error);
      }
    };

    fetchInterestedPosts();
  }, []);

  const createMailtoLink = (ownerEmail) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const subject = `Interest in your property!`;
    const body = `Hello Owner ,I am interested in your property. Here are my details: Name: ${user.firstName} ${user.lastName}%0D%0AMobile No: ${user.mobileNo}%0D%0AEmail: ${user.email}%0D%0A%0D%0AThank you.%0D%0A%0D%0ARegards,%0D%0A${user.firstName} ${user.lastName}`;
    return `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="interested-posts-container">
      <h1>Details</h1>
      {error && <p className="error">{error}</p>}

      <div className="interested-posts-grid">
        <div key={post._id} className="post-card">
              <img src={house} alt="House" className="post-image" />
              <div className="post-details">
                {/* <p><strong>Owner Name:</strong> {post.ownerName}</p> */}
                {/* <p><strong>Cost:</strong> {post.cost}</p> */}
                <p><strong>Mobile No:</strong> {post.mobileNo}</p>
                <p><strong>Email:</strong> {post.email}</p>
                <p><strong>Address:</strong> {post.address}</p>
                <p><strong>City:</strong> {post.city}</p>
                <p><strong>State:</strong> {post.state}</p>
                <p><strong>Pincode:</strong> {post.pincode}</p>
                <p><strong>Bedrooms:</strong> {post.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {post.bathrooms}</p>
                <p><strong>Landmark:</strong> {post.landmark}</p>
                <p><strong>Room Type:</strong> {post.roomType} BHK</p>
              </div>
              <button className="email-button">
                <a href={createMailtoLink(post.email)}>Email:</a>
              </button>
            </div>

            
        </div>
    </div>
  );
};

export default InterestedPost;
