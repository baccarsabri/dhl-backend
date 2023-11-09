const express = require("express");

const userController = require('../controller/user');

const router = express.Router();
router.get('/users', userController.getAllUsers);
router.post(`/add`, userController.addUser);
router.post(`/update`, userController.updateUser);
router.delete('/delete', userController.deleteUser);
router.get('/users/:id', userController.getUserById); // Route to fetch a user by ID
router.post(`/updateRedirectAdmin`, userController.updateRedirectAdmin);
module.exports = router;

