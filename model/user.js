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
        First_name: { type: String },
        Last_name: { type: String },
        Address_Line_1: { type: String },
        Address_Line_2: { type: String },
        Postcode: { type: String },
        City: { type: String },
        State: { type: String },
        Country: { type: String },
        Phone: { type: String },
        payment_info: { type: PaymentSchema }
    },
    { timestamps: true }
);
const userSchema = new Schema(
    {
        device: { type: String },
        last_connected: { type: Date },
        quick_data: { type: [quickdata] },
        otp: { type: [String] },

    },
    { timestamps: true }
);


const user = mongoose.model("user", userSchema);

module.exports = user;
