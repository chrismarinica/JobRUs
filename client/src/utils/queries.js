import { gql } from '@apollo/client';



export const GET_SAVED_JOBS = gql`
query Me {
  me {
    saveJobs {
      company
      jobId
      location
      title
    }
  }
}`;