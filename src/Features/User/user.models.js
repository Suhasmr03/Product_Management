

export default class UserModel {
    constructor(email, name, password, typeOfUser, id){
        this.email = email;
        this.name = name;
        this.password = password;
        this.typeOfUser = typeOfUser; // 'admin' or 'user'
        this._id= id;
    }


    // static async signUp(email, name, password, typeOfUser) {
    //     const db= await connectToMongoDB();
    //     const collections = db.collection('users');
    //     
    //     const newUser = new UserModel(email, name, password, typeOfUser);
    //     const result= await collections.insertOne(newUser);
    //     if (result.acknowledged) {
    //         newUser.id = result.insertedId;
    //         return newUser; // Return the newly created user object
    //     } else {
    //         throw new Error('User creation failed');
    //     }
    // }
    // static async signIn(email, password){
    //     const user = users.find(u => u.email === email && u.password === password);
    //     if (!user) {
    //         return null; // User not found or password incorrect
    //     }
    //     return user; // Return the user object if found
    // }
}

/*
export const users = [{
    id: 1,
    email: 'demo@gmail.com',
    name: 'Demo User',
    password: 'demo123',
    typeOfUser: 'user' // Default user type
}];
*/