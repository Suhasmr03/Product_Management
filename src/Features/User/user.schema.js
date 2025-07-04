
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email:{type: String, unique: true, required: true},
    password: {type: String, required: true},
    typeOfUser: {type: String}, // 'admin' or 'user'
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

export default User