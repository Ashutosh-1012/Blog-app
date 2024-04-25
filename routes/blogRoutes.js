const express=require('express');
const { getAllBlogController,
     createBlogController,
      updateBlogController,
       getBlogByIdController,
        deleteBlogController, 
        userBlogController} = require('../controllers/blogController');

// router object
const router=express.Router();
//get all blog
router.get('/all-blog',getAllBlogController);
//post create blog
router.post('/create-blog',createBlogController);
//put update blog
router.put('/update-blog/:id',updateBlogController);
//get single blog details
router.get('/get-blog/:id',getBlogByIdController);
//delete blog
router.delete('/delete-blog/:id',deleteBlogController);
//get user blog
router.get('/user-blg/:id',userBlogController);

// module.exports means it export the whole package of the file 
module.exports=router;



