const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    firstName: {type: String, required: true, maxlength:20, minlength: 3},
    lastName: {type: String, required: true, maxlength:20, minlength: 3},
    password: {type: String, required: true, minlength: 8},
    dob: {type: Date, required: true, min: new Date('17-04-2008')},
    gender: {type: String, enum: ['M' , 'F']},
    email: {type: String, match: /.+@.+\..+/, unique: true , index: true},
    phoneNo: {type: String,maxlength:11, minlength: 11, required: true, unique: true}
})

// create instance method
userShema.methods.getFullName = function getFullName(){

    return this.firstName + " " + this.lastName
}

// attach static methods on schema

// userShema.static.getUserByGender = function getUserByGender(gender, cb){
//       this.find({gender: gender}, cb)
    
// }

const userModel = mongoose.model('User', userShema)

// userModel.getUserByGender("M" , (err , data) =>{
//     console.log('get gender')
// })

module.exports = userModel