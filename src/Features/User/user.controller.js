import userSchema from './user.schema.js';
import jwt from 'jsonwebtoken';
import UserRepository from './user.repository.js';
import bcrypt, { hash } from 'bcryptjs';

export default class UserControllers {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(req, res) {
        const { email, name, password, typeOfUser } = req.body;

        // No need to hash password here, handled in repository
        const newUser = new userSchema({ email, name, password, typeOfUser });
        await this.userRepository.signUp(newUser);
        return res.status(201).send({ message: 'User created successfully', user: newUser });
    }

    async signIn(req, res) {
        try {
            const user=await this.userRepository.findUserByEmail(req.body.email);
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }
            const result= await bcrypt.compare(req.body.password, user.password);
            if (result){
                const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).send({ message: 'Sign in successful', token });  
            }else {
            // Add this else block!
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        } catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error: error.message });
        }
    }

    async resetPassword(req, res) {
        const {newpassword}= req.body;
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        const hashedPassword = await bcrypt.hash(newpassword, 10);
        try {
             await this.userRepository.resetPassword(userId, hashedPassword);
             res.status(200).send({ message: 'Password reset successfully' });
        } catch (error) {
            return res.status(500).send({ message: 'Something went wrong', error: error.message });
        }
}

}
