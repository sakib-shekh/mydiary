const express = require("express");
const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchuser = require('../middleware.js/fetchuser.js')
const jwt = require("jsonwebtoken");
const JWTsecret = "sakib@@";

// register route-----------------------------------------------------------------------------
router.post(
  "/register",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: "just" });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json({ status: "ok", message: "user already exist" });
    }
    const salt = bcrypt.genSaltSync(10);
    const SecPass = bcrypt.hashSync(req.body.password, salt);
    let user2 = await new User({
      name: req.body.name,
      email: req.body.email,
      password: SecPass,
    });
    console.log(1);
    user2.save();
    const data = {
      user: {
        id: user2.id,
      },
    };
    console.log(1);
    const authToken = await jwt.sign(data, JWTsecret);
    res.json({
      status: "ok",
      message: authToken,
    });
  }
);
//login-------------------------------------------------------------------------------------------
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password cannot be black").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: "just" });
    }
    const { email, password } = req.body;
 
      let user = await User.findOne({ email });
      if (!user) {
        return res.json({
          status: 404,
          meessage: "please login with valid credential",
        });
      }
      console.log(1);
      const comparePass = bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res.json({
          status: 404,
          meessage: "please login with valid credential",
        });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(data, JWTsecret);
      res.json({
           authToken
      });
   
  }
);

// get user route for this user should be already login then we will send the data to client with respective data
router.post(
  "/getuser",fetchuser,
  async (req, res) => {
    
    try{
        const userid=req.user.id;
        console.log(userid);
        const user=await User.findById(userid).select("-password");
        res.send(user);
    }catch(err)
    {
      console.log(err.meessage);
      res.json({message:"internal sever error"});
    }
    
  }
);

module.exports = router;
