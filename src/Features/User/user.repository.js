import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './user.schema.js'; // Adjust the path as needed
// filepath: e:\Web dev projects\application_using_restApi\src\Features\User\user.repository.js // Adjust the path as needed

class UserRepository {
    // Signup method
    async signUp({ name, email, password, typeOfUser }) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, typeOfUser });
        await user.save();
        return user;
    }


    async signIn(email, password) {
        try {
            return await User.findOne({ email, password });

        } catch (error) {
            throw new Error(`Sign in failed: ${error.message}`);
        }
    }
    async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (error) {
            throw new Error(`Find user failed: ${error.message}`);
        }
    }

    async resetPassword(userId, newPassword) {
        try {
            const user= await User.findById(userId);
            if (user){
                user.password=newPassword;
                await user.save();

            }else{
                throw new Error('User not found');
            }
        } catch (error) {
            throw new Error(`Reset password failed: ${error.message}`);
        }
    }
}

export default  UserRepository;
