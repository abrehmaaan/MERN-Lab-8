const User = require("../models/userModel")
const validator = require('validator')
const insertUser = async (req, res) => {
    const { name, email, password, address, phone } = req.body;
    // Validate the form data
    if (!name || !validator.isLength(name, { min: 2, max: 100 })) {
      res.end('Please enter a valid name');
    }
    else if (!email || !validator.isEmail(email)) {
      res.end('Please enter a valid email address');
    }
    else if (!password || !validator.isLength(password, { min: 8, max: 100 })) {
      res.end('Please enter a valid password');
    }
    else if (!address || !validator.isLength(address, { min: 5, max: 200 })) {
      res.end('Please enter a valid address');
    }
    else if (!phone || !validator.isMobilePhone(phone)) {
      res.end('Please enter a valid phone number');
    }
    else{
      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.end('This email is already in use');
      }
      else{
        // Create a new user
        const user = new User({ name, email, password, address, phone });
        await user.save(); // save the user to the database
        res.end("Signup Successful");
      }
    }
  }

const verifyUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Validate the form data
    if (!email || !validator.isEmail(email)) {
      res.end('Please enter a valid email address');
    }
    else if (!password || !validator.isLength(password, { min: 8, max: 100 })) {
      res.end('Please enter a valid password');
    }
    else{
      // Check if the email exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        res.end('This email does not exist');
      }
      else{
        // Check if the password is correct
        if (password != user.password) {
          res.end('Incorrect password');
        }
        else{
          res.end('Login Successful');
        }
      }
    }
  }

const findUser = async (userId) => {
    let users = await User.find({ userId })
    return users
}

module.exports = {insertUser, verifyUser, findUser};
