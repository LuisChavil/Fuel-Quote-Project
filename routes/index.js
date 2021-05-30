const router = require('express').Router()
const User = require("../models/user")
const Fuel = require("../models/fuel");
const { STATES } = require('mongoose');

// 
router.get('/fuelQuote/:id',(req,res) => {
  Fuel.find({'userid':req.params.id})
 .then(function(doc) {
        if(!doc)
            throw new Error('No record found.');
      User.findOne({'_id':req.params.id})
      .then(function(user){
        if(!user){
          throw new Error('No record found.');
        }
        console.log(user)
        res.json({
           doc:doc,
          state:user.state,
          
        })
        
      })
      console.log(doc);//else case
  });
})




// was /fuelHistory/
router.get('/History/:id', (req, res) => {
 Fuel.find({'userid':req.params.id})
 .then(function(doc) {
        if(!doc)
            throw new Error('No record found.');
      User.findOne({'_id':req.params.id})
      .then(function(user){
        if(!user){
          throw new Error('No record found.');
        }
        console.log(user)
        res.json({
           doc:doc,
          state:user.state,
         
        })
      })
      console.log(doc);//else case
  });
  })
  
  // req info about request from user and res object handles responses(error) 
  
  router.post('/login', (req, res) => {
    console.log(req.body)
   User.findOne({
     username: req.body.username
   })
   .then(user => {
     if(!user){
       return res.status(500).send({

         message: "That user was not found"
       });
     }
     user.comparePassword(req.body.password)
     .then((match) => {
       if(match) {
         res.send({
           id: user._id
         });
       }
       else {
         return res.status(400).send({
           message: "This password is invalid"
         });
       }
     })
     .catch((err) => {
       console.log(err);
      return res.status(500).send({
        message: "There was an error verifying the password!"
      })
     })
   })
  })


  router.post('/register', (req,res) => {
    User.create(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err); 
    })
  })


  router.post('/fuelQuote', (req,res) => {
    Fuel.findOne({userid: req.body.userid})
    .then(function (result){
      let fuelbody = {...req.body}
      if(result){
        fuelbody.firstentry = false;
      }
      else{
        fuelbody.firstentry = true;
      }
      Fuel.create(fuelbody)
      .then(fuel => {
        res.json(fuel)
      })
      .catch(err => {
        console.log(err)
        res.send(500).json(err)
      })
    })
  })

  function getInfo(user,password){
    for(let key in accounts){
      if(user == accounts[key].username && password == accounts[key].password){
        console.log(user + " has been entered");
        return accounts[key]
      }
    }
      console.log("error in inputting sorry")
  }




  

  router.post('/contact', (req,res) => {
   
    let result = { 
      name: req.body.name
  
    }
    console.log(result)
    res.json(result);
  });


  module.exports = router;