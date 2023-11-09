const mongoose = require("mongoose");
const { Schema } = mongoose;



const countrySchema = new Schema(
    {
        Country_code: { type: String },

    },
    { timestamps: true }
);


const country = mongoose.model("country", countrySchema);

module.exports = country;
