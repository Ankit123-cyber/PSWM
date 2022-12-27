
const express=require('express');
const path=require('path');
const db=require('./config/mongose');

const Blog = require('./model/contact');
const userschema = require('./model/userDBschema');
const bcrypt=require('bcrypt');
var jwt = require('jsonwebtoken');

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

const app=express();

const port= 600;



app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

//var contactlist=[]
 var contactlist=[{
  
 }]
//


function checkUser(req,res,next){
    var verifytoken=localStorage.getItem('usertoken');
    try{    
        
         var decoded=jwt.verify(verifytoken,'loginToken');
         
        
    }catch(err){
        console.log("error in token");
        console.log(err);
        res.redirect('/');
    }
    
    next();
}


/*middleware for duplicate email checking */

function checkEmail(req,res,next){
    var email=req.body.email;
    var alreadyexistemail=userschema.findOne({email:email});
    alreadyexistemail.exec((err,data)=>{
         if(err) throw err;
         if(data)
         {
           return res.render('Register',{msg:'User Already Exist'});
         }
         next();
    }
)}



/*########################################################################### */
app.get('/',(req,res)=>{
    
   
    res.render('indexlogin',{msg:''});

})

app.post('/indexlogin',(req,res)=>{

    var username=req.body.uname;
    var passwordf=req.body.psw;
    var checkpassword=userschema.findOne({name:username});
    console.log("password fetching");
    checkpassword.exec((err,data)=>{
        if(err) console.log("error in password");

        /* now if no error we will get data as object format so we will fetch password*/
       console.log("  password fecthed");
       console.log(passwordf);
        
       var getUserID=data._id;
        var getPassword=data.password;
        console.log(getPassword);
        if(bcrypt.compareSync(passwordf,getPassword)){

            var token = jwt.sign({ userID: getUserID }, 'loginToken'); //for generating token
            
            localStorage.setItem('usertoken', token);
            localStorage.setItem('loginUser', username);
            localStorage.setItem('userOBID', getUserID);
            console.log(getUserID);
             res.redirect('/home');
        }
        else{
             res.render('indexlogin',{msg:'Password Not Matched'});
        }
    })
  
   
})





app.get('/Register',(req,res)=>{
    
   
    res.render('Register',{msg:''});

})


app.post('/Register',checkEmail,(req,res)=>{
    
   var uname=req.body.username;
   var email=req.body.email;
   var password=req.body.psw;
   password=bcrypt.hashSync(req.body.psw,10);

   const userDetails=new userschema({
    name:uname,
    email:email,
    password:password
   });
   userDetails.save((err,doc)=>{
    if(err) throw err;

    console.log('***',doc);
    res.render('Register',{msg:'Successfuly Register'});
    
   })
    

})




app.get('/home',checkUser,(req,res)=>{
    
    var loginUser=localStorage.getItem('loginUser');
    console.log(loginUser);
    Blog.find({Userkey:localStorage.getItem('userOBID' )},function(err,contacts){
        if(err){
            console.log('error in fetching');
            return;
        }

        return res.render('home',{
            contact_lists:contacts,

            loginUser:loginUser
           });


    });
 
})

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    //get id from query in url
    let id=req.query.id;
    //find the id in the database and delete it
    // let contactIndex=contactlist.findIndex(contact=> contact.phone == phone);
    // if(contactIndex!=-1)
    // {
    //     contactlist.splice(contactIndex,1);
    // }
    Blog.findByIdAndDelete(id,function(err){

        if(err){
            console.log("error in deleting the contacts");
        }
        return res.redirect('back');
    });
   
});



app.post('/person2',(req,res)=>{
    // contactlist.push(
    //     {
    //     name:req.body.name,
    //     phone:req.body.phone
    //     }
    // )

    

    Blog.create({
        name:req.body.name,
        Phone:req.body.phone,
        Categories:req.body.category,
         Userkey:localStorage.getItem('userOBID')

    },function(err,newContact){
        if(err){
            console.log('no data storing');
            return;
        }

        console.log('***',newContact);
        return res.redirect('back');
    });

    
})


app.get('/logout',(req,res)=>{
    localStorage.removeItem('usertoken');
    localStorage.removeItem('loginUser');
   
    res.redirect('/');

})
 


app.listen(port,function(err){
    if(err)
    {
        console.log("error");
    }

    console.log("express server running");
    
});