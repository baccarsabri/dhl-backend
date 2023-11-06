const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://baccar:Gxdsu3NJQ2xO69QX@cluster0.e7sj9am.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected :=====> BACKEND");
    } catch (err) {
        console.log(`Error in connecting to database BACKEND : ${err}`);
    }
};

connectDB();

module.exports.mongoose = mongoose;
