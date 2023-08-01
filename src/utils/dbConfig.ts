import mongoose from "mongoose";

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.log("something went wrong")
    }
}