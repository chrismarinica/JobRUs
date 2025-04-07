var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jobSchema from './Jobs';
const userSchema = new Schema({
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
    savedJobs: [jobSchema],
}, {
    toJSON: {
        virtuals: true,
    },
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew || this.isModified('password')) {
            const saltRounds = 10;
            this.password = yield bcrypt.hash(this.password, saltRounds);
        }
        next();
    });
});
userSchema.methods.isCorrectPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt.compare(password, this.password);
    });
};
userSchema.virtual('JobCount').get(function () {
    return this.savedJobs.length;
});
const User = model('User', userSchema);
export default User;
