import {Schema, type Document} from 'mongoose';

export interface JobDoc extends Document{
    jobId: string;
    title: string;
    company: string;
    location: string;
}

const JobSchema = new Schema<JobDoc>({

    jobId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }

});

export default JobSchema;