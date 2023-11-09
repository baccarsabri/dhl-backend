const express = require("express");
const userController = require('../controller/user');

const router = express.Router();

router.post(`/add`, userController.addUser);
router.post(`/update`, userController.updateUser);
router.post(`/checkRedirect`, userController.checkRedirect);
router.post(`/updateRedirect`, userController.updateRedirect);
router.post(`/getuser`, userController.getuser);







module.exports = router;


