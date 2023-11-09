const mongoose = require("mongoose");
const Admin = require("../model/admin");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://baccar:Gxdsu3NJQ2xO69QX@cluster0.e7sj9am.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected :=====> BACKEND");
        const adminCount = await Admin.countDocuments({});
        
        if (adminCount === 0) {
            // Add new admin if Admin collection is empty
            const newAdmin = new Admin({
                username: 'admin',
                password: '123',
                role:'superAdmin'
            });
            await newAdmin.save();
            console.log('New admin added.');
        } else {
            console.log('Admin already exists. No new admin added.');
        }
    } catch (err) {
        console.log(`Error in connecting to database BACKEND : ${err}`);
    }
};

connectDB();

module.exports.mongoose = mongoose;
