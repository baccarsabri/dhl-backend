const express = require("express");
const router = express.Router();

const adminController = require('../controller/admin');
const countryController = require('../controller/country');




router.post(`/login`, adminController.login);
router.get('/:id', adminController.getAdminById); // Route to fetch a user by ID
router.delete('/delete/:id', adminController.deleteAdmin); // Route to fetch a user by ID


router.get('/admins/all', adminController.getAdminsWithRoleAdmin); // Route to fetch a user by ID
router.post(`/admins/add`, adminController.createAdmin);
// Update admin's password
router.put('/admins/changePassword', adminController.updateAdminPassword);


router.post('/countries/add', countryController.addCountry);
router.delete('/countries/delete/:id', countryController.deleteCountry);
router.get('/countries/all', countryController.getAllCountries);



router.post("/blocked", adminController.addBlockedIP);

// Delete a blocked IP
router.delete("/blocked/:ip/:userId", adminController.deleteBlockedIP);

// Check if an IP is blocked
router.get("/blocked/:ip", adminController.isIPBlocked);
module.exports = router;
