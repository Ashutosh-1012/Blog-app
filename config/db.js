const mongoose=require('mongoose')
const colors=require('colors')

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected ${mongoose.connection.host}`.bgMagenta.white);
    }catch(error){
        console.log(`mongodb error${error}`.bgRed.white);
    }
};
module.exports=connectDB;