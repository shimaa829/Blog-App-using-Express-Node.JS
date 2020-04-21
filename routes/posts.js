const express = require('express')
const PostModel = require('../models/posts')
const router = express.Router()


router.use((req ,res , next)=>{
    console.log("post router")
    next()

})


// listing posts
router.get('/',async (req , res, next)=>{
    try{
            const posts = await PostModel.find({}).populate('author')
            return res.json(posts)

        }catch(err){
            next(err)
        }
})

// listing post with his id 
router.get('/:id',async (req ,res , next)=>{
    try{
            // get value of id
            const post = await PostModel.findById(req.params.id)
            return res.json(post)

        }catch(err){
           next(err)
        }
  })



// Create Post
router.post('/',async (req ,res , next)=>{
   
    // get request body ===> req.body
    const {title , body , author} = req.body
    
    // construct post instance from PostModel
    const postInstance = new PostModel({
        title, 
        body, 
        author
    })

    try{
            // save post instance in db
            const post = await postInstance.save()
            return res.json(post)

        }catch(err){
              next(err)
        }
  
 
})

// updating post with id
router.patch('/:id',async (req ,res, next)=>{
   try{
          // get value of id
            await PostModel.findByIdAndUpdate(req.params.id, {$set: req.body})
            return res.send('Post is Edited successfully')

      }catch(err){
           next(err)        
      }

})


// deleting post with id
router.delete('/:id',async (req ,res,next)=>{
   try{
         // get value of id
          await PostModel.findByIdAndRemove(req.params.id)
          return res.send('Deleted Successfully')

      }catch(err){
           next(err)
      }
})

module.exports = router