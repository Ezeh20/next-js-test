import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: [true, 'please enter a username'],
        unique: true,
    },
    email: {
        type: 'string',
        required: [true, 'please enter a email'],
        unique: true,
    },
    password: {
        type: 'string',
        required: [true, 'please enter a password'],
    },
    isVerified: {
        type: 'boolean',
        default: false,
    },
    isAdmin: {
        type: 'boolean',
        default: false,
    },
    forgotPasswordToken: string,
    forgotPasswordTokenExpiry: Date,
    verifyToken: string,
    verifyTokenExpiry: Date,
})

const User = mongoose.model.users || mongoose.model("Users", UserSchema)
export default User