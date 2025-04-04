import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../graphql/queries';

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_JOBS);
  const [search, setSearch] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);

  const filteredJobs = data?.getJobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleSaveJob = (job) => {
    setSavedJobs((prev) => [...prev, job]);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Job Search</h1>
      <input
        type="text"
        placeholder="Search jobs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {filteredJobs?.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
            <button onClick={() => handleSaveJob(job)}>Save Job</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;


