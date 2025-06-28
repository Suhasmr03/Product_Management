import { MongoClient } from 'mongodb';

 // Replace with your MongoDB connection string
let client;

export const connectToMongoDB = async () => {
    const uri = process.env.DB_URI;
    client = new MongoClient(uri);
    await client.connect()
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('MongoDB connection error:', err));
    return client.db();
};

export default connectToMongoDB;
