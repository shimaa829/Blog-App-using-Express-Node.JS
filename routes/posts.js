const express = require('express')
const PostModel = require('../models/posts')
const router = express.Router()


router.use((req ,res , next)=>{
    console.log("post router")
    next()

})


// listing posts
router.get('/',(req , res, next)=>{

    PostModel.find({}).populate('author').exec((err , posts)=>{
          if(!err){
              return res.json(posts)
          }
          next(err)
    })
})

// listing post with his id 
router.get('/:id',(req ,res , next)=>{

    // get value of id
    PostModel.findById(req.params.id,(err , post)=>{
        if(!err){
            return res.json(post)
        }
        next(err)
     })
  })



// Create Post
router.post('/',(req ,res , next)=>{
   
    // get request body ===> req.body
    const {title , body , author} = req.body
    
    // construct post instance from PostModel
    const postInstance = new PostModel({
        title, 
        body, 
        author
    })

    const postDetails = postInstance.getPostDetails()
    console.log(postDetails)

    // save post instance in db
    postInstance.save((err , post)=>{
        if(!err){
            return res.json(post)
        }
        next(err)
    })
 
})

// updating post with id
router.patch('/:id',(req ,res, next)=>{

    // get value of id
    PostModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, post) => {
        if (!err) {
            return res.send('Post is Edited successfully')
        }
        next(err)        
    })

})


// deleting post with id
router.delete('/:id',(req ,res,next)=>{

    // get value of id
    PostModel.findByIdAndRemove(req.params.id,(err)=>{
           if(!err){
               return res.send('Deleted Successfully')
           }
           next(err)
        }) 
})

module.exports = router