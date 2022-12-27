var mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    name:{
         type:String,
         required: true
         
    } ,

    email:{
        type:String,
        required: true
       
   } ,
   password:{
    type:String,
    required:true
   }
   
    
  });

  const userRegister = mongoose.model('userRegister',userSchema );
  module.exports=userRegister;