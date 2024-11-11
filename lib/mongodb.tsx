import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {

    console.log('Connecting to MongoDB...');
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || '', {} as ConnectOptions);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;