import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server'; // Para testing local

let mongoServer;

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            mongoServer = await MongoMemoryServer.create();
            const uri = mongoServer.getUri();
            await mongoose.connect(uri);
        } else {
            await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mockingDB');
        }
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await mongoose.disconnect();
    if (mongoServer) await mongoServer.stop();
};

export { connectDB, disconnectDB };