const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
            .then(() => console.log("MongoDB connected successfully."))
            .catch((error) => console.log("MongoDB connection error " + error))
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB