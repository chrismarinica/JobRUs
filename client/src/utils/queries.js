import { gql } from '@apollo/client';



export const GET_SAVED_JOBS = gql`
query Me {
  me {
    savedJobs {
      company
      jobId
      location
      title
    }
  }
}`;