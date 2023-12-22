const express = require('express');
const router = express.Router();


require('../dbconn/conn')
const Post = require('../models/propertySchema')

router.post('/', async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        return res.status(200).json({ message: 'Post saved' })
    } catch (err) {
        return res.status(422).json(err)
    }
})

router.get('/property/:city', async (req, res) => {
    try {
        const currentCity = await Post.find({ city: req.params.city }).collation(
            { locale: 'en', strength: 1 }
        );
        return res.status(200).json(currentCity);
    } catch (err) {
        return res.status(422).json(err)
    }
})

router.get('/detail/:city/:detailId', async (req, res) => {
    try {
        // const currentCity = await Post.find({ city: req.params.city }).collation(
        //     { locale: 'en', strength: 1 }
        // );
        const currentProperty = await Post.find({_id : req.params.detailId})
        return res.status(200).json(currentProperty);
    } catch (err) {
        return res.status(422).json(err)
    }
})

//like & dislike a post
router.put('/:id/like',async (req,res)=>{
    try{
        const likePost = await Post.findById(req.params.id);
        if(!likePost.likes.includes(req.body.userId)){
            const test = await likePost.updateOne({ $push : {likes : req.body.userId}});
            return res.status(200).json({message : 'Post has been Liked' });
        }else{
            await likePost.updateOne({ $pull : {likes : req.body.userId}});
            return res.status(200).json({message : 'Post has been Disliked' });
        }
    }catch(err){
        return res.status(422).json(err);
    }
})

module.exports = router;