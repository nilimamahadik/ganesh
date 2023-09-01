 const receipt = require("../models/receipt");

// exports.submit_form = async (req, res) => {
//     try {
//       const user = await receipt.findOne({ email: req.body.email }).exec();
//       if (user) return res.status(400).json({
//         message: ' Admin already registered'
//       });
  
//       const {
//         mandalname,
//         name,
//         phone,
//         email,
//         password,
//         status
//       } = req.body;
  
//       // console.log(password)
  
//       const _user = new User({
//         mandalname,
//         name,
//         phone,
//         email,
//         password,
//         status
  
//       });
  
//       _user.password = await bcrypt.hash(password, 10,)
  
//       //console.log("USER :: ",_user)
  
//       const savedUser = await _user.save();
//       if (savedUser) {
  
//         return res.status(201).json({
//           message: "User created successfully",
//           data: _user,
//         })
//       }
  
//     } catch (error) {
//       return res.status(400).json({
//         message: error
//       });
//     }
//   }




exports.submit_form = async (req, res) => {
    const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    // console.log(req.body)
try{
const save = await receipt.findOne({name: req.body.name})
if(save) return res.status(400).json({
    message:'User already registered'
});
const {
   
    name,
    address,
    amount,
    phone,
    group_id,
    receiver
} = req.body;

const candidate = new receipt({
    date,
    name,
    address,
    phone,
    amount,
    group_id,
    receiver
});

const saved  = await candidate.save();
// console.log(saved);
return res.status(201).json({

    data: saved,
    status:"success",
    message:"candidate saved successfully"
})
}
catch(error){
     console.log(error.message);
    }
}


exports.getallusers = async (req, res)  => {
  // console.log(req.params);
    try{
const allusers = await receipt.find({group_id:req.params.id})
// console.log(allusers);
return res.status(201).json({
    data: allusers,
    status:"success",
    message:"candidate get successfully",
    count: allusers.length
})
    }
    catch(err){
console.log(err.message)
    }
}


exports.getsingleusers = async (req, res) => {
  // console.log(req.params);
  try{
const singleusers = await receipt.findById(req.params.id)
//  console.log(singleusers);
return res.status(201).json({
  data: singleusers,
  status:"success",
  message:"candidate get successfully"
})
  }
  catch(err){
console.log(err.message)
  }
}


exports.getallinfo = async (req, res)  => {
  // console.log(req.params);
    try{
const allinfo = await receipt.find()
// console.log(allinfo);
return res.status(201).json({
     allinfo
    // status:"success",
    // message:"candidate get successfully",
    // count: allusers.length
})
    }
    catch(err){
console.log(err.message)
    }
}
