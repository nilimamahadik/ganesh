
const Admin = require('../models/admin')
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const admin = require('../models/admin');
const User = require('../models/user')

exports.update = async (req, res) => {
  // console.log(req.params);
try {
const update = await User.findOneAndUpdate(
  {_id: req.params.id},
  {
    $set: {
status: "success"
    }
  },
  {new:true}
  )
  if(update) {
return res.status(201).json({
  message: "request find successfully",
  data: update
 
})

}
  } catch (error) {
    return res.status(400).json({
      message: error
    });
  }
}

exports.user_management = async (req, res) => {
// console.log(req);
  try {
    const group = req.body.id
    // console.log(group);
const pendinguser = await User.find({mandalname :group  })
// console.log(pendinguser);
return res.status(201).json({
  message: "request find successfully",
  data: pendinguser,
  count:pendinguser.length
})

    
  } catch (error) {
    return res.status(400).json({
      message: error
    });
  }
}

exports.create_admin_account = async (req, res) => {
// console.log(req.body);
  try {
    const admin = await Admin.findOne({ email: req.body.email }).exec();
    if (admin) return res.status(400).json({
      message: ' Admin already registered'
    });

    const {
      mandalname,
      name,
      phone,
      address,
      email,
      password
    } = req.body;

    // console.log(password)

    const _admin = new Admin({
      mandalname,
      name,
      phone,
      address,
      email,
      password

    });

    _admin.password = await bcrypt.hash(password, 10,)

    //console.log("USER :: ",_user)

    const savedAdmin = await _admin.save();
    if (savedAdmin) {

      return res.status(201).json({
        message: "User created successfully",
        data: _admin,
        status:"Admin"
      })
    }

  } catch (error) {
    return res.status(400).json({
      message: error
    });
  }
}


exports.authenticate_admin = async (req, res) => {
  // console.log(req.body)
  try {
    const { email, password } = req.body;
    // Check if user exists

    await Admin.findOne({ email }).then((user) => {
      // console.log("EMAIL :: ", user)
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
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
              status: "Admin",
              id: user.mandalname,
              address: user.address,
              name: user.name
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

exports.getallmandals = async (req, res) => {
  try {
    const allmandals = await admin.find()
    // console.log(allmandals);
    return res.status(201).json({
      data: allmandals,
      status: "success",
      message: "candidate get successfully"
    })
  }
  catch (err) {
    console.log(err.message)
  }
}




