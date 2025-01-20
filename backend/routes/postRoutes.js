const authenticate = require('../middleware/authMiddleware');
const Post = require('../models/post');
const express = require('express');
const router = express.Router();


router.post('/create', authenticate, async (req, res) => {
    try {
      // Create a new post with the data received from the user
      const newPost = new Post({
        content: req.body.content,
        user: req.user.id,  // This is the logged-in user ID
      });
  
      // Save the post to the database
      await newPost.save();
  
      res.status(200).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  });


router.post('/like/:postId',authenticate, async(req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        if(!post){
            return res.status(400).json({message:"Post not found"});
        }

        if(post.likes.includes(req.user.id)){
            returnres.status(400).json({message:"You have liked this post"});
        }

        post.likes.push(req.user.id);
        await post.save();

        res.status(200).json({message:"Post liked succefully",post});
    } catch(error){
        res.status(500).json({message:'somthing went wrong',error})
    }
});

// Fetch all posts
router.get('/all', authenticate, async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('user', 'username email') // Populating user info (only username and email)
        .populate('likes', 'username') // Populating likes to show user info
        .sort({ createdAt: -1 }); // Sorting posts by newest first
  
      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong', error });
    }
  });
  

module.exports = router;
