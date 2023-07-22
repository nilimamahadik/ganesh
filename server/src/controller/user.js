
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const admin = require('../models/admin');


exports.create_user_account = async (req, res) => {
  // console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (user) return res.status(400).json({
      message: ' User already registered'
    });

    const {
      mandalname,
      name,
      phone,
      address,
      email,
      password,
      status
    } = req.body;

    // console.log(password)

    const _user = new User({
      mandalname,
      name,
      phone,
      address,
      email,
      password,
      status

    });

    _user.password = await bcrypt.hash(password, 10,)

    //console.log("USER :: ",_user)

    const savedUser = await _user.save();
    if (savedUser) {

      return res.status(201).json({
        message: "User created successfully",
        data: _user,
        status: "User"
      })
    }

  } catch (error) {
    return res.status(400).json({
      message: error
    });
  }
}

exports.authenticate_user = async (req, res) => {
// console.log(req.body);
  try {
    const { email, password } = req.body;
    // Check if user exists

    await User.findOne({email: email}).then((user) => {
      // console.log("EMAIL :: ", user)
      if (!user) {
        return res.status(400).json({ error: "Invalid email or  password" });
      }else if(user.status == "pending"){
        return res.status(400).json({ error: "Your Request is Pending , Admin not accepted yet" });   
      }


      bcrypt.compare(password, user.password, function (error, isMatch) {
        // console.log("MATCH :: ", isMatch)
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email
          }
          jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 31556926 }, (err, token) => {
            return res.status(200).json({
              message: "Sign In success",
              data: token,
              status: "User",
              id: user.mandalname,
              name: user.name,
              address: user.address
            })
          })
        }
        else {
          return res.status(400).json({ error: "Invalid email or password" });
        }

      })
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Semething Went Wrong" });
  }
};
