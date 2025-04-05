import {Schema, model, Document} from 'mongoose';

export interface JobDoc extends Document{
    jobId: string;
    title: string;
    company: string;
    location: string;
}