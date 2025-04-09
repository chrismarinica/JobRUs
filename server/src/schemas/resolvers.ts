//todo define query and mutation function to work with Mongoose models.

import {User} from '../models/index.js';
import {siginToken, AuthenticationError } from '../services/auth.js';

interface AddUserArgs{
    input: {

        username: string;
        email: string;
        password: string;
    }
}

interface LoginUserArgs{
    email: string;
    password: string;
}

interface addsaveJob{
    jobId: string;
    title: string;
    company: string;
    location: string;

}

const resolvers = {

    Query: {

        me: async(_parent: any, _args: any, context: any) =>{

            if(context.user){
                const newUser = await User.findOne({_id: context.user._id}).populate("savedJobs");
                return newUser;
            }
            throw new AuthenticationError('Unable to authenticate user.');
        }
    },

    Mutation: {

        addUser: async(_parent: any, {input}: AddUserArgs) =>{
            const user = await User.create({...input});

            if (!user){
                throw new AuthenticationError('Something went Wrong!');
            }
            const token = siginToken(user.username, user.email, user._id);

            return {token, user};
        },

        login: async (_parent: any, {email, password}: LoginUserArgs) =>{

            const user = await User.findOne({email});

            if(!user)
            {
                throw new AuthenticationError('Unable find this user');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw)
            {
                throw new AuthenticationError("Incorrect Password!");
            }

            const token = siginToken(user.username, user.email, user._id);

            return {token, user};

        },

        saveJob: async (_parent: any, args: addsaveJob, context: any) =>{

            try{

                if(context.user){
                    const updatedUser = await User.findOneAndUpdate(
                        {_id: context.user_id},
                        {$addToSet: {saveJobs: {...args}}},
                        {new: true, runValidators: true}

                    );
                    return updatedUser;
                }
                throw new Error("Invalid credentials!");
            }
            catch(err){
                console.log(err);
                return(err);
            }
        },

        deleteJob: async(_parent: any, args: any, context: any) => {
            const updatedUser = await User.findOneAndUpdate(
                {_id: context.user._id},
                {$pull:{savejobs:{jobId: args.jobId}}},
                {new: true}
            );

            if(!updatedUser){
                throw new Error("Invalid credentials!")
            }
            return updatedUser;

        },
    },


}; 

export default resolvers;