import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Post.css';

const Post = () => {
  const [pincode, setPincode] = useState('');
  const [FlatNo, setFlatNo] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [hall, setHall] = useState('');
  const [nearbySpots, setNearbySpots] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (user.userType !== 'seller') {
    return <div>You do not have permission to access this page.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!pincode || !city || !address || !state || !bedrooms || !bathrooms || !hall || !FlatNo) {
      setError('Please fill in all fields');
      return;
    }
    console.log(pincode, city, address, state, bedrooms, bathrooms, hall, nearbySpots,FlatNo);

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify({ FlatNo, address , city , state , pincode , email:user.email,mobileNo:user.mobileNo, bedrooms, bathrooms, roomType:hall, landmark:nearbySpots ,userId:user._id}),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (response.ok) {
        navigate('/');  // Redirect to home page or another page
      } else {
        setError(result.message || 'Post creation failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="post-container">
      <h1>Create a Post</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
            FlatNo:
          <input
            type="text"
            value={FlatNo}
            onChange={(e) => setFlatNo(e.target.value)}
          />
        </label>

        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        
        <label>
          Pincode:
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </label>

        <label>
          State:
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </label>

        <label>
          Number of Bedrooms:
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </label>

        <label>
          Number of Bathrooms:
          <input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </label>

        <label>
          Hall:
          <input
            type="number"
            value={hall}
            onChange={(e) => setHall(e.target.value)}
          />
        </label>

        <label>
          Nearby Spots (comma separated):
          <input
            type="text"
            value={nearbySpots}
            onChange={(e) => setNearbySpots(e.target.value)}
          />
        </label>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default Post;
