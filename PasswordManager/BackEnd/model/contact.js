var mongoose = require('mongoose');

const blogSchema = new  mongoose.Schema({
    name:{
         type:String,
         required: true
    } ,

    Userkey:{
        type:mongoose.ObjectId,
        required:true
    },
    Phone:{
        type:String,
        required: true
   } ,
   Categories:{
     type:String
   }
    
  });

  const Blog = mongoose.model('Blog', blogSchema);
  module.exports=Blog;