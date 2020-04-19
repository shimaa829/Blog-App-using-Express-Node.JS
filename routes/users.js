const express = require('express')
const UserModel = require('../models/users')
const router = express.Router()


router.use((req ,res , next)=>{
    console.log("user router")
    next()

})

router.get('/',(req , res, next)=>{
    // process request  ===> get data from data source
    //return response
    // send resopnse to client side
    UserModel.find({},(err , users)=>{
          if(!err){
              return res.json(users)
          }
          next(err)
    })
    // res.send('listing users')
})
router.get('/:id',(req ,res)=>{
    // get value of id
    const routeParams = req.params
    const { id } = routeParams
    UserModel.find({},(err , users)=>{
        if(!err){
            return res.json(users)
        }
        next(err)
  })
    // const { id , postid , x } = routeParams

    // process request ===> fetch instance with recieved id
    // return response
    // send resopnse to client side
    res.send(`listing user with id = ${id}`)
    
})
router.post('/',(req ,res , next)=>{
    debugger;
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
    // res.send(`creating instance`)
})
router.patch('/:id',(req ,res)=>{
    res.send(`updating user with id = ${req.params.id}`)
    
})
router.delete('/:id',(req ,res)=>{
    res.send(`deleting user with id = ${req.params.id}`)
    
})

module.exports = router
