import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SAVED_JOBS } from '../graphql/queries'; // Query for fetching saved jobs
import { REMOVE_JOB } from '../graphql/mutations'; // Mutation for removing jobs
import JobCard from '../components/JobCard';

const SavedJobs = () => {
  const { data, loading, error } = useQuery(GET_SAVED_JOBS); // Fetch saved jobs
  const [removeJob] = useMutation(REMOVE_JOB); // Mutation to remove a job
  const [savedJobs, setSavedJobs] = useState([]); // Local state for saved jobs

  // useEffect to update savedJobs when data is fetched
  useEffect(() => {
    if (data && data.savedJobs) {
      setSavedJobs(data.savedJobs);
    }
  }, [data]); // Dependency on data to re-run whenever it changes

  const handleRemoveJob = async (jobId) => {
    try {
      await removeJob({ variables: { jobId } });
      setSavedJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId)); // Remove the job locally
      alert('Job removed successfully!');
    } catch (error) {
      console.error('Error removing job:', error);
      alert('Failed to remove job!');
    }
  };

  if (loading) return <p>Loading saved jobs...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Saved Jobs</h1>

      {savedJobs.length > 0 ? (
        <div className="job-listings">
          {savedJobs.map((job) => (
            <JobCard
              key={job.job_id}
              job={job}
              onSave={() => handleRemoveJob(job.job_id)} // Use onSave to remove the job
            />
          ))}
        </div>
      ) : (
        <p>No saved jobs yet!</p>
      )}
    </div>
  );
};

export default SavedJobs;


