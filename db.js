import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    })
}

export default connectToDB;