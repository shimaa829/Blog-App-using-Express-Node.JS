const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, maxlength:20, minlength: 3},
    lastName: {type: String, required: true, maxlength:20, minlength: 3},
    password: {type: String, required: true, minlength: 8},
    dob: {type: Date, min: new Date('17-04-2008')},
    gender: {type: String, enum: ['M' , 'F']},
    email: {type: String, match: /.+@.+\..+/, unique: true , index: true},
    phoneNo: {type: String,maxlength:11, minlength: 11, required: true, unique: true}
})

// create instance method
userSchema.methods.getFullName = function getFullName(){

    return this.firstName + " " + this.lastName
}

// attach static methods on schema

// userSchema.static.getUserByGender = function getUserByGender(gender, cb){
//       this.find({gender: gender}, cb)
    
// }

// convert plaintext password to hashed password
userSchema.pre('save',function(doc,next){
    if(doc.isNew){
        bcrypt.hash(doc.password,10,(err, hashedPassword)=>{
            doc.password = hashedPassword
            next()
        })
    }
})

const userModel = mongoose.model('User', userSchema)

// userModel.getUserByGender("M" , (err , data) =>{
//     console.log('get gender')
// })

module.exports = userModel