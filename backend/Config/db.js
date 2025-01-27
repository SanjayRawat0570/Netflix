import mongoose from 'mongoose';
import { ENV_VARS} from './envVars.js';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log ("MongoDB connected: " + connect.connection.host);
    }
    catch (error) {
        console.error("error connecting to MONGODB:"+error.message);
        process.exit(1);
    }

    };