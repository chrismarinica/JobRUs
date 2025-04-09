import { Schema } from 'mongoose';
const JobSchema = new Schema({
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
