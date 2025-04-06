import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import axios from 'axios';
import { SAVE_JOB } from '../utils/mutations'; // Import your SAVE_JOB mutation
import { useNavigate } from 'react-router-dom';
//import JobCard from '../components/JobCard'; // Import JobCard component


const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const IS_LOGGED_IN = false;
  
  // The mutation hook for saving jobs
  //const [saveJob] = useMutation(SAVE_JOB);

  // Login Check
useEffect (() => {
  if (!IS_LOGGED_IN){
    navigate('/login')
  }
});
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
  }, [search]); // Re-run API call if search query changes

  // Handling save job functionality with GraphQL mutation
  const handleSaveJob = async (job) => {
    try {
      // Save the job using the GraphQL mutation <- Uncomment mutation stuff, 
      // await saveJob({ variables: { jobId: job.job_id, title: job.job_title, employer: job.employer_name } });
      alert('Job saved successfully!');
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job!');
    }
  };

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
    <div>
      <h1>Job Search</h1>

      {/* Search Input and Search Button */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Search Button */}
        <button onClick={() => setSearch(search)}>Search</button>
      </div>

      {/* Display filtered jobs */}
      <div className = "filtered-jobs-container">
        {filteredJobs.map((job) => (
          <div key={job.job_id}>
            <h3>{job.job_title}</h3>
            <p>{job.employer_name} - {job.job_city}, {job.job_country}</p>
            
            {/* Save Job Button */}
            <button onClick={() => handleSaveJob(job)}>
              Save Job
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;








