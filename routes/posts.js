const express = require('express')
const router = express.Router()


router.use((req ,res , next)=>{
    console.log("post router")
    next()

})

router.get('/',(req , res)=>{
    // process request  ===> get data from data source
    //return response
    // send resopnse to client side
    res.send('listing posts')
})
router.get('/:id',(req ,res)=>{
    // get value of id
    const routeParams = req.params
    const { id } = routeParams
    // const { id , postid , x } = routeParams

    // process request ===> fetch instance with recieved id
    // return response
    // send resopnse to client side
    res.send(`listing post with id = ${id}`)
    
})
router.post('/',(req ,res)=>{
    res.send(`creating instance`)
})
router.patch('/:id',(req ,res)=>{
    res.send(`updating post with id = ${req.params.id}`)
    
})
router.delete('/:id',(req ,res)=>{
    res.send(`deleting post with id = ${req.params.id}`)
    
})

module.exports = router