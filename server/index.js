
const express = require("express")
const env= require('dotenv');
const app = express();
const mongoose =require('mongoose');
app.use(express.json())
// const helmet = require('helmet');
var cors = require('cors')
app.use(cors())
// app.use(helmet());
 env.config();


const authRoutes =require("./src/routes/user");

const MONGO_URL =process.env.MONGO_URL 


mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("error ::", error.message);
  });

  app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send("welcome")
})

app.listen(process.env.PORT, ()=>{
  console.log(`server is ready for port ${process.env.PORT}`)
})
