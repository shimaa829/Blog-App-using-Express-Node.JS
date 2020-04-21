const express = require('express')
const UserModel = require('../models/users')
const PostModel = require('../models/posts')
const router = express.Router()


router.use((req ,res , next)=>{
    console.log("user router")
    next()

})


// listing users
router.get('/', async (req , res, next)=>{
   try{
        const users = await UserModel.find({})
        return res.json(users)

      }catch(err){
          next(err)
      }
})

// listing user with his id 
router.get('/:id', async (req ,res , next)=>{
    try{
          // get value of id
          const user = await UserModel.findById(req.params.id)
          return res.json(user)

        }catch(err){
           next(err)
        }
  })



// Create User
router.post('/',async (req ,res , next)=>{
   
    // get request body ===> req.body
    const {firstName , lastName, password , dob ,  gender , email, phoneNo} = req.body

            // construct user instance from UserModel
            const userInstance = new UserModel({
                firstName,
                lastName,
                password,
                dob,
                gender,
                email, 
                phoneNo
            })
            try{
            // save user instance in db
            const user = await userInstance.save()
            return res.json(user)

        }catch(err){
           next(err)
        }
 
})

// updating user with id
router.patch('/:id',async (req ,res, next)=>{
try{
        // get value of id
        await UserModel.findByIdAndUpdate(req.params.id, {$set: req.body})
        return res.send('User udpated.')

    }catch(err){
        next(err)        
    }

})


// deleting user with id
router.delete('/:id',async (req ,res,next)=>{
    try{
           await UserModel.findByIdAndRemove(req.params.id)
            return res.send('Deleted Successfully')

        }catch(err){
           next(err)
        }
})

router.get('/:id/posts', async (req ,res, next) =>{
      try{
            const posts = await PostModel.find({'author': req.params.id})
            return res.json(posts)
        }catch(err){
            next(err)
        }
})

module.exports = router
