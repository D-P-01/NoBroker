import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import house from "../assets/house.jpg";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/posts?page=${currentPage}&limit=9`);
        const result = await response.json();
        console.log(result)

        if (response.ok) {
          setPosts(result.posts);
          setFilteredPosts(result.posts);
          setTotalPages(result.totalPages);
        } else {
          setError(result.message || 'Failed to fetch posts');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        console.error('Error:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const handleFilter = (e) => {
    setCity(e.target.value)
    if (e.target.value) {
      const filtered = posts.filter(post => post.city.toLowerCase().includes(e.target.value.toLowerCase()));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  };

  const clearFilter = () => {
    setCity('');
    setFilteredPosts(posts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage > 1 ? prevPage - 1 : prevPage);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage < totalPages ? prevPage + 1 : prevPage);
  };

  return (
    <div className="all-posts-container">
      <h1>All Posts</h1>
      {error && <p className="error">{error}</p>}

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by city"
          value={city}
          onChange={handleFilter}
        />
        {/* <button onClick={clearFilter}>Clear Filter</button> */}
      </div>

      <div className="posts-grid">
        {filteredPosts.map(post => (
          <div key={post._id} className="post-card">
            <img src={house} alt="House" className="post-image" />
            <div className="post-details">
              <p><strong>Location:</strong> {post.address}, {post.city}</p>
              <p><strong>Flat No:</strong> {post.FlatNo}</p>
              <p><strong>Contact:</strong> {post.mobileNo}</p>
              <button onClick={() => navigate(`/post/${post._id}`)}>I'm Interested</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Home;
