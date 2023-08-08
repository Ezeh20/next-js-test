import mongoose from "mongoose";

const connect = async () => {
    try {
         mongoose.connect(process.env.MONGO!);
    } catch (error) {
        console.log("something went wrong")
    }
}

export default connect