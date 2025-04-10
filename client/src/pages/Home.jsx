import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header/Header';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // API request with axios
  useEffect(() => {
    const fetchJobs = async () => {
      const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: { query: search || 'software engineer, salt lake city' }, // Default search
        headers: {
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
          'x-rapidapi-key': '664cb1904emsh51a13b367e18495p1750e4jsn18814e4adfb7', // Your API key
        },
      };

      try {
        const response = await axios.request(options);
        setJobs(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [search]);

  // Loading state
  if (loading) return <p>Loading jobs...</p>;

  // Error state
  if (error) return <p>Error: {error}</p>;

  // Filter jobs based on the search input
  const filteredJobs = jobs.filter((job) =>
    job.job_title.toLowerCase().includes(search.toLowerCase()) ||
    job.employer_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <Header/>

      {/* Search Input and Search Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <button onClick={() => setSearch(search)} className="search-button">
          Search
        </button>
      </div>

      {/* Display filtered jobs */}
      <div className="filtered-jobs-container">
        {filteredJobs.map((job) => (
          <div key={job.job_id} className="job-card">
            <h3>{job.job_title}</h3>
            <p>{job.employer_name} - {job.job_city}, {job.job_country}</p>
            <button className="save-job-button">
              Save Job
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;









