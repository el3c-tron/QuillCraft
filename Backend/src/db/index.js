import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/QuillCraft`);
        console.log(`\nDataBase Conneted : HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("\nMONGODB CONNECTION ERROR!!!" , error);
        process.exit(1)
    }
}

export default connectDB;