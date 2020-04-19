const express = require('express')
const UserModel = require('../models/users')
const router = express.Router()


router.use((req ,res , next)=>{
    console.log("user router")
    next()

})


// listing users
router.get('/',(req , res, next)=>{

    UserModel.find({},(err , users)=>{
          if(!err){
              return res.json(users)
          }
          next(err)
    })
})

// listing user with his id 
router.get('/:id',(req ,res , next)=>{
    
    // get value of id
    const routeParams = req.params
    const { id } = routeParams
    UserModel.findById(id,(err , user)=>{
        if(!err){
            return res.json(user)
        }
        next(err)
     })
  })



// Create User
router.post('/',(req ,res , next)=>{
   
    // get request body ===> req.body
    const {firstName , lastName, password , dob , gender , email, phoneNo} = req.body
    
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

    const fullName = userInstance.getFullName()
    console.log(fullName)

    // save user instance in db
    userInstance.save((err , user)=>{
        if(!err){
            return res.json(user)
        }
        next(err)
    })
 
})

// updating user with id
router.patch('/:id',(req ,res, next)=>{

    // get value of id
    const routeParams = req.params
    const { id } = routeParams
    UserModel.findByIdAndUpdate(id, {$set: req.body}, (err, user) => {
        if (!err) {
            return res.send('User udpated.')
        }
        next(err)        
    })

})


// deleting user with id
router.delete('/:id',(req ,res,next)=>{

    // get value of id
    const routeParams = req.params
    const { id } = routeParams
    UserModel.findByIdAndRemove(id,(err)=>{
           if(!err){
               return res.send('Deleted Successfully')
           }
           next(err)
        }) 
})

module.exports = router
