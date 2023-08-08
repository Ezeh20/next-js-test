import mongoose from "mongoose";

let User:any

if (mongoose.models.User) {
    User = mongoose.model('User');
} else {
    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, 'Please enter a username'],
            unique: true
        },
        email: {
            type: String,
            required: [true, 'Please enter a valid email address'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
            unique: true
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        forgotPasswordToken: String,
        forgotPasswordTokenExpiry: Date,
        verifyToken: String,
        verifyTokenExpiry: Date,
    })

     User = mongoose.model("User", userSchema)
}

export default User