const User = require("../model/user");


exports.addUser = async (req, res) => {
    try {
        const { device, last_connected, quick_data, otp } = req.body;
        try {
            const user = await User.create({
                _id: uid,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                gender: req.body.gender,
            });

            console.log("User created successfully!", user);
            return res.status(200).json({ message: "User added successfully!" });
        } catch (err) {
            console.log("Error while adding user :=======> ", err);
            return res.status(500).json({ message: err.message });
        }
    } catch (err) {
        console.log("Error while creating user :=======> ", err);
        return res.status(500).send({ message: `${err.code} - ${err.message}` });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Assuming User is your Mongoose model

        console.log("All users fetched successfully!", users);
        return res.status(200).json(users);
    } catch (err) {
        console.log("Error while fetching all users: ", err);
        return res.status(500).json({ message: err.message });
    }
};
