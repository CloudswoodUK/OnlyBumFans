import mongoose from "mongoose";
export const connect = async () => {
    try {
        console.log("MONGO_URI : ", process.env.MONGO_URI);
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            dbName: 'OnlyBumFans',
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
}