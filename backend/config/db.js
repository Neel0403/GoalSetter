const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected successfully on host: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log("MONGODB connection failed.", error);
        process.exit(1);
    }
}

module.exports = connectDB