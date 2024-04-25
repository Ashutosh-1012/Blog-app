const express =require('express')
const cors =require('cors')
const morgan =require('morgan')
const colors =require('colors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//dotenv config
  dotenv.config();
// routes import
const userRoutes=require('./routes/userroutes'); 
const blogRoutes=require('./routes/blogRoutes');
//config database
connectDB();

const app = express()

//middle ware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
// app.get('/',(req,res)=>{
//     res.status(200).send({
//         message:"NODE SERVER",
//     });
// });
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);
const PORT=process.env.PORT || 8080
//listen
app.listen(8080,()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} mode port no ${PORT}`.bgCyan.white);
})