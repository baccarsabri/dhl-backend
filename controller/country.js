
const Country = require("../model/country");


exports.addCountry = async (req, res) => {
    const { Country_code } = req.body; // Extract the country code from the request body

    try {
        // Create a new country instance using the Country model
        const newCountry = new Country({
            Country_code: Country_code,
        });

        // Save the new country to the database
        await newCountry.save();

        console.log("New country added successfully!");
        return res.status(201).json(newCountry); // Respond with the newly added country
    } catch (err) {
        console.log("Error while adding country: ", err);
        return res.status(500).json({ message: err.message });
    }
};


exports.deleteCountry = async (req, res) => {
    const countryId = req.params.id; // Extract the country ID from the request parameters

    try {
        const deletionResult = await Country.deleteOne({ _id: countryId });
        if (deletionResult.deletedCount > 0) {
            return res.json({ success: true, message: 'User deleted successfully' });
        } else {
            return res.json({ success: false, message: 'User not found for deletion' });
        }
    } catch (err) {
        console.log("Error while deleting country: ", err);
        return res.status(500).json({ message: err.message });
    }
};

exports.getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find(); // Retrieve all countries

        console.log("All countries fetched successfully!");
        return res.status(200).json(countries); // Respond with the list of all countries
    } catch (err) {
        console.log("Error while fetching countries: ", err);
        return res.status(500).json({ message: err.message });
    }
};


