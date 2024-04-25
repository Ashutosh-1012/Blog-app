const mongoose = require("mongoose");
const blogmodel=require('../models/blogModel');
const userModel = require('../models/usermodel');

// Get all blogs
exports.getAllBlogController = async (req, res) => {
    try {
        const blogs = await blogmodel.find({});
        if (!blogs) {
            return res.status(404).json({
                message: "No blogs found",
                success: false
            });
        }
        res.status(200).json({
            message: "Blogs found",
            success: true,
            BlogCount: blogs.length,
            blogs
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
//create blog
exports.createBlogController=async(req,res)=>{
    try{
        const {title , description , image , user } = req.body;
        console.log(req.body);
        console.log(user);
        if(!title ||!user|| !description || !image ){
            return res.status(400).send({
                success:false,
                message:"please all required field"
            });
        }
    const existingUser=await userModel.findById(user);
    if(!existingUser){
        return res.status(404).send({
            message:"unable to find user ",
            success:false,
        })
    }
    const newblog = new blogmodel({title,description,image});
    const session=await mongoose.startSession();
    session.startTransaction();
    await newblog.save({session});
    existingUser.blogs.push(newblog);
    await existingUser.save({session});
    await session.commitTransaction();
    await newblog.save();
    return res.status(200).send({
        success:true,
        message:"new blog created",
        newblog,
    })

    }
    catch(error){
        console.log(error);
        return res.status(400).send({
            success:false,
            message:"Error in creating blog",
            error: error.message,
        })
    }
};
//update blog
exports.updateBlogController=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description,image}=req.body;
        const blog=await blogmodel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).send({
            success:true,
            message:"blog updated",
            blog,
        });
    }
    catch(error){
        return res.status(400).send({
            success:false,
            message:"error during updating blog",
            error:error.message,
        });
    }
};
//get single blog
exports.getBlogByIdController=async(req,res)=>{
    try{
        const {id}=req.params;
        const blog= await blogmodel.findById(id);
        if(!blog){
            return res.status(400).send({
                message:"error during finding blog",
                success:false
            });
        }
        return res.status(200).send({
            message:"blog is get",
            success:true,
            blog,
        });
    }
    catch(error){
        return res.status(400).send({
            message:"error during the finding blog 1",
            success:false,
            error:error.message
        });
    }
};
//delete blog
exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogmodel.findOneAndDelete({ _id: req.params.id }).populate("user");
        if (!blog) {
            return res.status(404).send({
                message: "Blog not found",
                success: false
            });
        }
        if (blog.user) {
            await blog.user.blogs.pull(blog);
            await blog.user.save();
        }
        return res.status(200).send({
            message: "Blog deleted",
            success: true
        });
    } catch (error) {
        return res.status(400).send({
            message: "Error during blog deleting",
            success: false,
            error: error.message
        });
    }
};
//user blog
exports.userBlogController=async(req,res)=>{
    try{
        const userblog=await userModel.findById(req.params.id).populate("blogs");
        if(!userblog){
            return res.status(400).send({
                success:false,
                message:"blog not found",
            });
        }
        return res.status(200).send({
            message:"blog found",
            success:true,
            userblog,
        }); 
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            message:"error in blog for user",
            success:false,
            error:error.message,
        })
    }
}