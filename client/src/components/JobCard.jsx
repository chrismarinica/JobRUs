import React from 'react';

const JobCard = ({ job, onSave }) => {
  return (
    <div className="job-card">
      <h3>{job.job_title}</h3>
      <p>{job.employer_name} - {job.job_city}, {job.job_country}</p>
      <p><strong>Location:</strong> {job.job_city}</p>
      <button onClick={onSave}>+ Save Job</button>
    </div>
  );
};

export default JobCard;
