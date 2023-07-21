
const express = require("express")
const env= require('dotenv');
const app = express();
const mongoose =require('mongoose');
app.use(express.json())
var cors = require('cors');

app.use(cors());
env.config();


const authRoutes =require("./src/routes/user");


mongoose.connect('mongodb+srv://nilima23101998:mandal123@cluster0.lrrw8on.mongodb.net/?retryWrites=true&w=majority' )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

  app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send("welcome")
})



    
 

app.listen(process.env.PORT, ()=>{
  console.log(`server is ready for port ${process.env.PORT}`)
})
