
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbURI = process.env.DB_URI;
        await mongoose.connect(dbURI);
        console.log('MongoDB using Mongoose connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;