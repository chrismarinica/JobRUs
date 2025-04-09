//todo define query and mutation function to work with Mongoose models.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from '../models/index.js';
import { siginToken, AuthenticationError } from '../services/auth.js';
const resolvers = {
    Query: {
        me: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.user) {
                return User.findOne({ _id: context.user.id }).populate("jobs");
            }
            throw new AuthenticationError('Unable to authenticate user.');
        })
    },
    Mutation: {
        addUser: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { input }) {
            const user = yield User.create(Object.assign({}, input));
            if (!user) {
                throw new AuthenticationError('Something went Wrong!');
            }
            const token = siginToken(user.username, user.email, user._id);
            return { token, user };
        }),
        login: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { email, password }) {
            const user = yield User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Unable find this user');
            }
            const correctPw = yield user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect Password!");
            }
            const token = siginToken(user.username, user.email, user._id);
            return { token, user };
        }),
        saveJob: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (context.user) {
                    const updatedUser = yield User.findOneAndUpdate({ _id: context.user_id }, { $addToSet: { saveJobs: Object.assign({}, args) } }, { new: true, runValidators: true });
                    return updatedUser;
                }
                throw new Error("Invalid credentials!");
            }
            catch (err) {
                console.log(err);
                return (err);
            }
        }),
        deleteJob: (_parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const updatedUser = yield User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savejobs: { jobId: args.jobId } } }, { new: true });
            if (!updatedUser) {
                throw new Error("Invalid credentials!");
            }
            return updatedUser;
        }),
    },
};
export default resolvers;
