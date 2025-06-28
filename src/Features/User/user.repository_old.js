import { connectToMongoDB } from '../../Config/mongodb.js';


 class UserRepository {

     async signUp(newUser) {
        try {
            const db = await connectToMongoDB();
            const collections = db.collection('users');
            const result = await collections.insertOne(newUser);
            if (result.acknowledged) {
                newUser.id = result.insertedId;
                return newUser;
            } else {
                throw new Error('User creation failed');
            }
        } catch (error) {
            throw new Error(`Sign up failed: ${error.message}`);
        }
    }
    async findUserByEmail(email) {
        try {
            const db = await connectToMongoDB();
            const collections = db.collection('users');
            const user = await collections.findOne({ email });
            return user;
        } catch (error) {
            throw new Error(`Find user failed: ${error.message}`);
        }
    }

}

export default UserRepository;