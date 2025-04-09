import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import JobSchema from './Jobs.js';
import type {JobDoc} from './Jobs.js';

export interface UserDoc extends Document {
    username: string;
    email: string;
    password: string;
    savedJobs: JobDoc[];
    isCorrectPassword(password: string): Promise<boolean>;
    JobCount: number;
}

const userSchema = new Schema<UserDoc>(
    {
         username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
         },
         email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],

         },
         password: {
            type: String,
            required: true,
            minlength: 8,
         },

         savedJobs: [JobSchema],

    },
    {
        toJSON: {
            virtuals: true,
        },
    }

);

userSchema.pre<UserDoc>('save', async function(next) {
    if(this.isNew || this.isModified('password')){
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);

    }

    next();

});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
    
};

userSchema.virtual('JobCount').get(function() {
    return this.savedJobs.length;
});

const User = model<UserDoc>('User', userSchema);

export default User;