const mongoose = require("mongoose");
const { Schema } = mongoose;



const blockedSchema = new Schema(
    {
        ip: { type: String },

    },
    { timestamps: true }
);


const blocked = mongoose.model("blocked", blockedSchema);

module.exports = blocked;
