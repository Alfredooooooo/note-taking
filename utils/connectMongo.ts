import mongoose from 'mongoose';

export async function connectMongo() {
    const { MONGO_URI } = process.env;
    mongoose.connect(
        MONGO_URI as string,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions
    );
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB connection error: ' + err.message);
    });
}
