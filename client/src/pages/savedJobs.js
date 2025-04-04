import React from 'react';

const SavedJobsPage = ({ savedJobs }) => {
  return (
    <div>
      <h1>Your Saved Jobs</h1>
      {savedJobs.length === 0 ? (
        <p>No saved jobs.</p>
      ) : (
        savedJobs.map((job, index) => (
          <div key={index}>
            <h3>{job.title}</h3>
            <p>{job.company} - {job.location}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedJobsPage;
