const express = require('express')
const mongoose = require('mongoose')
const userRouter = require ('./routes/users')
const postRouter = require ('./routes/posts')
const logRequestBody = require ('./middlewares/log')
const log = require ('./middlewares/logRequestBody')

const PORT  = process.env.PORT  || 6001
mongoose.connect('mongodb://localhost:27017/blog-app',
                 { 
                   useNewUrlParser: true ,
                   useUnifiedTopology: true
                 },
                (err) =>{
                     if(!err) return console.log('started connection on mongodb')
                  })
const app = express()


app.use(express.static('public'))
// this middleware handles all requests which are sent with json content type
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(log)
app.use(logRequestBody)

// /users/  ===> /
// /users/:id ===> /:id

app.use('/users',userRouter)
app.use('/posts',postRouter)

app.use((err,req,res,next)=>{
    res.status(500).send(err)
})

app.listen(PORT,(err)=>{
   if(!err) return console.log(`started server on port ${PORT}`)
   console.log(err)
})