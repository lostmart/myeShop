import mongoose from 'mongoose';

// Assuming `DB_LOCAL` is a string. If not, you might need to handle it accordingly.
const connectToMongoDB = async (): Promise<void> => {
    try {
        const connectionString: string | undefined = process.env.DB_LOCAL;
        if (!connectionString) {
            throw new Error('Database connection string is not defined in the environment variables.');
        }

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error: any) { // Using `any` for error type to access `message`. For more specific typing, consider creating an error interface.
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
};

export { connectToMongoDB };
