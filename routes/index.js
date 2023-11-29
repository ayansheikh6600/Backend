const express = require("express");

const router = express.Router();
const fs = require("fs");

const { SignupController, LoginController, OTPVerification } = require("../Controllers/authControllers");
const upload = require("../Utils/multer");
const cloudinary = require("cloudinary").v2;


// auths
router.post("/api/signup", upload.any("image"), SignupController);
router.post("/api/login", LoginController);
router.post("/api/otp-verifcation", OTPVerification);



module.exports = {router};