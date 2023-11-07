const express = require("express");

const userController = require('../controller/user');

const router = express.Router();
router.get('/users', userController.getAllUsers);
router.post(`/add`, userController.addUser);
router.post(`/update`, userController.updateUser);

module.exports = router;

