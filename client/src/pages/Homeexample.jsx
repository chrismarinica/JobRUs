import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'

const Homeexample = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(()=>{
        const options = {
            method: "GET",
            url: "https://jsearch.p.rapidapi.com/search",
            params: {query: "software engineer, salt lake city"},
            headers: {
                "x-rapidapi-host": "jsearch.p.rapidapi.com",
                "x-rapidapi-key": "664cb1904emsh51a13b367e18495p1750e4jsn18814e4adfb7"
            }
        }
        axios.request(options)
        .then((response)=>{
            setJobs(response.data.data);
            setLoading(false)
        })
        .catch((err)=>{
            setError(err.message);
            setLoading(false)
        });
    },[])
    if (loading) return <p>loadingjobs...</p>
    if (error) return <p>error:{error}</p>
  return (
    <div>
      <h1>Here Are The Jobs You Searched</h1>
      <ul>
        {jobs.map((job)=>
        (
            <li key={job.job_id}>
                <strong>{job.job_title}</strong> at {job.employer_name}
                 location: {job.job_city}, {job.job_country}
            </li>

        ))}
      </ul>
    </div>
  )
}

export default Homeexample
