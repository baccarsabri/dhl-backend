const Admin = require("../model/admin");

const Blocked = require("../model/blockedUsers");

const User = require("../model/user");


exports.login = async(req, res, next) => {
    try {
        

        const username = req.body.username;
        const password = req.body.password;

        const user = await Admin.findOne({
            username: username
        });

        if (!user) {
            return res.status(200).json({
                success: false,
                error_message: "User not found",
            });
        }

        const validPassword = password === user.password;
        if (!validPassword) {
            return res.status(200).json({
                success: false,
                error_message: "Incorrect password",
            });
        }

      
        return res.status(200).json({
            success: true,
            user: user,
        });
    } catch (err) {
        next(err);
    }
};


exports.getAdminById = async (req, res) => {
    const userId = req.params.id; // Extract user ID from request parameters

    try {
        const user = await Admin.findById(userId); // Assuming User is your Mongoose model

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User fetched successfully by ID!");
        return res.status(200).json(user);
    } catch (err) {
        console.log("Error while fetching user by ID: ", err);
        return res.status(500).json({ message: err.message });
    }
};

exports.getAdminsWithRoleAdmin = async (req, res) => {
    try {
        const admins = await Admin.find({ role: "admin" }).sort({ _id: -1 });

        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: "Admins with role 'admin' not found" });
        }

        console.log("Admins with role 'admin' fetched successfully!");
        return res.status(200).json(admins);
    } catch (err) {
        console.log("Error while fetching admins with role 'admin': ", err);
        return res.status(500).json({ message: err.message });
    }
};

exports.createAdmin = async (req, res) => {
    const { username, password } = req.body; // Extract details from the request body

    try {

        const role = "admin";
        // Create a new admin instance using the Admin model
        const newAdmin = new Admin({
            username: username,
            password: password,
            role: role
        });

        // Save the new admin to the database
        await newAdmin.save();

        console.log("New admin created successfully!");
        return res.status(201).json(newAdmin); // Respond with the newly created admin
    } catch (err) {
        console.log("Error while creating admin: ", err);
        return res.status(500).json({ message: err.message });
    }
};

exports.updateAdminPassword = async (req, res) => {
    const { id, newPassword } = req.body; // Extract admin ID and the new password from the request body

    try {
        const admin = await Admin.findById(id); // Find the admin by their ID

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Update the password
        admin.password = newPassword;
        await admin.save();

        console.log("Admin password updated successfully!");
        return res.status(200).json(admin); // Respond with the updated admin details
    } catch (err) {
        console.log("Error while updating admin password: ", err);
        return res.status(500).json({ message: err.message });
    }
};


exports.deleteAdmin = async (req, res) => {
    const adminId = req.params.id; // Extract the admin ID from the request parameters

    try {
        const deletionResult = await Admin.deleteOne({ _id: adminId });
            if (deletionResult.deletedCount > 0) {
                return res.json({ success: true, message: 'User deleted successfully' });
            } else {
                return res.json({ success: false, message: 'User not found for deletion' });
            }
    } catch (err) {
        console.log("Error while deleting admin: ", err);
        return res.status(500).json({ message: err.message });
    }
};


async function addBlockedIP(userId,ip) {
    try {
        const existingBlockedIP = await Blocked.findOne({ ip });
        if (!existingBlockedIP) {
            const newBlockedIP = new Blocked({ ip });
            await newBlockedIP.save();
            console.log(`IP ${ip} added to the blocked list.`);
            const user = await User.findById(userId);
            user.blocked = true;
            await user.save();
            return true; // Successfully added
        } else {
            console.log(`IP ${ip} already exists in the blocked list.`);
            return false; // IP already exists
        }
    } catch (error) {
        console.error(`Error adding IP ${ip} to the blocked list: ${error.message}`);
        return false; // Failed to add IP
    }
}

// Function to delete a blocked IP
async function deleteBlockedIP(ip,userId) {
    try {
        const result = await Blocked.deleteOne({ ip:ip });
        if (result.deletedCount > 0) {
            console.log(`IP ${ip} deleted from the blocked list.`);
            const user = await User.findById(userId);
            user.blocked = false;
            await user.save();
            return true; // Successfully deleted
        } else {
            console.log(`IP ${ip} not found in the blocked list.`);
            return false; // IP not found
        }
    } catch (error) {
        console.error(`Error deleting IP ${ip} from the blocked list: ${error.message}`);
        return false; // Failed to delete IP
    }
}

// Function to check if an IP is blocked
async function isIPBlocked(ip) {
    const result = await Blocked.exists({ ip });
    return result;
}


exports.addBlockedIP = async (req, res) => {
    const { ip,userId } = req.body;

    try {
        const result = await addBlockedIP(userId,ip);
        if (result) {
            return res.status(200).json({ message: `IP ${ip} added to the blocked list.` });
        } else {
            return res.status(400).json({ message: `IP ${ip} already exists in the blocked list.` });
        }
    } catch (error) {
        console.error("Error adding blocked IP: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.deleteBlockedIP = async (req, res) => {
    const { ip,userId } = req.params;

    try {
        const result = await deleteBlockedIP(ip,userId);
        if (result) {
            return res.status(200).json({ message: `IP ${ip} deleted from the blocked list.` });
        } else {
            return res.status(404).json({ message: `IP ${ip} not found in the blocked list.` });
        }
    } catch (error) {
        console.error("Error deleting blocked IP: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.isIPBlocked = async (req, res) => {
    const { ip } = req.params;

    try {
        const isBlocked = await isIPBlocked(ip);
        return res.status(200).json({ isBlocked });
    } catch (error) {
        console.error("Error checking blocked IP: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};