import mongoose from 'mongoose';
const connectToDB = async () => {
    await mongoose.connect("mongodb://localhost:27017/moxora").then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log(err);
    })
}

export default connectToDB;