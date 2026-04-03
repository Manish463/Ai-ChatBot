import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB connected: ${uri}`);
    } catch (error) {
        console.log(`Error occured: ${err}`);
    }
}