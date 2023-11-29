const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userSchema");
const { fileUploader } = require("../Utils/fileUploader");
const nodemailer = require("nodemailer");
const OtpModel = require("../model/optSchema");
const emailTemplate = require("../Template/emailTemplate");

const SignupController = async (req, res) => {
//   const image = req.files[0].path;
//   console.log(image);

  try {
    const body = req.body;
    console.log(body);
    return
    const { FullName, Email, Password, PhoneNo, userType } = body;
    if (!FullName || !Email || !Password || !PhoneNo || !userType) {
      res.json({
        status: false,
        message: "Required fields are missing",
        data: null,
      });
      return;
    }

    const emailExist = await UserModel.findOne({ Email });
    console.log(emailExist, "emailExist");
    if (emailExist) {
      res.json({
        status: false,
        message: "this email address has been already exists Please try again",
        data: null,
      });
      return;
    }

    const imageObj = await fileUploader(image);

    if (!imageObj) {
      res.json({
        message: "Image Not Upload",
      });
      return;
    }

    console.log(Password, "real");
    const hashpass = await bcrypt.hash(Password, 10);
    const objToSend = {
      full_name: FullName,
      phone_no: PhoneNo,
      image: imageObj.secure_url,
      email:Email,
      password: hashpass,
      user_type: userType,
    };

    const OTPCODE = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        rejectUnauthorized: false, // Accept self-signed certificates
      },
    });

    const emailData = await transporter.sendMail({
      from: process.env.USER,
      to: Email,
      subject: "Email Verfication",
      html: emailTemplate(FullName, OTPCODE),
    });

    await OtpModel.create({
      otp_code: OTPCODE,
      email : Email,
    });

    const userSave = await UserModel.create(objToSend)
        

    res.json({
      status: true,
      message: "user successfully signup",
      data: userSave,
    });
  } catch (error) {
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

const LoginController = async (req, res) => {
  const { email, password } = req.body;
  console.log("email , password", email, password);

 
  const emailExist = await UserModel.findOne({ email });


  console.log(emailExist, "emailExist");
  if (!emailExist) {
    res.json({
      message: "Invalid Credential",
      status: false,
      data: null,
    });
    return;
  }
  const comparePass = await bcrypt.compare(password, emailExist.password);
  if (comparePass) {
    if (!emailExist.isVerify) {
      res.json({
        message: "Please Verify your Account!",
        status: true,
        isVerify: false,
        data: null,
      });
      return;
    }

    var token = jwt.sign({ email: emailExist.email }, "PRIVATEKEY");
    console.log("token", token);

    res.json({
      message: "user login",
      status: true,
      data: emailExist,
      isVerify: true,
      token,
    });
    return;
  } else {
    res.json({
      message: "Invalid Credential",
      status: false,
      data: null,
    });
    return;
  }
};

const OTPVerification = async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    if (!email || !otpCode) {
      res.json({
        message: "Required fields are missing",
        status: false,
        data: null,
      });
      return;
    }

    const isValid = await OtpModel.findOne({
      otp_code: otpCode,
      email,
      isUsed: false,
    });

    if (!isValid) {
      res.json({
        message: "Invalid OTP",
        status: false,
        data: null,
      });
      return;
    }

    await OtpModel.updateOne(
      {
        otp_code: otpCode,
        email,
        isUsed: false,
      },
      { isUsed: true }
    );

    await UserModel.updateOne(
      {
        email,
      },
      { isVerify: true }
    );

    res.json({
      message: "User Successfully Signup",
      status: true,
      data: null,
    });
    console.log("isValid", isValid);
  } catch (error) {
    console.log("error", error.message);
    res.json({
      status: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  SignupController,
  LoginController,
  OTPVerification,
};
