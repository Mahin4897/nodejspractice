const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {user,postdb} = require('../model/db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth=require('../middleware/auth');
require('dotenv').config();
router.use(bodyParser.json());


router.post('/register',async (req,res)=>{
      const isuser=await user.findOne({where:{email:req.body.email}});
      if(isuser===null){
        const us=user.create({
            name:req.body.name,
            email:req.body.email,
            password:bcrypt.hashSync(req.body.password,10)
        });
        res.status(200).json({message:'user created successfully'});
      }
      else{
        res.status(400).json({message:'user already exist'});
        console.log(isuser.email);
      }
      
    })

router.post('/login',async (req,res)=>{
        const isuser=await user.findOne({where:{email:req.body.email}});
        if(isuser===null){
            res.status(400).json({message:'user not found'});
        }
        else{
            const ismatch=bcrypt.compareSync(req.body.password,isuser.password);
            if(ismatch){
                const token=jwt.sign({email:isuser.email},process.env.JWT_SECRET);
                res.status(200).json({
                    message:'user logged in successfully',
                    token:token
                });
            }
            else{
                res.status(400).json({message:'password is incorrect'});
            }
        }
    })

router.get("/",auth,(req,res)=>{
   res.status(200).json({message:'welcome to the homepage'});
})

router.post('/post',auth,async (req,res)=>{
  try{

    const useid= await user.findOne({where:{email:req.decoded}});
    if(!useid){
        res.status(400).json({message:'user not found'});
    }
    console.log(useid);
    const post = postdb.create({
        title:req.body.title,
        body:req.body.body,
        userId:useid.id
    });
    res.status(200).json({message:'post created successfully'});
  }catch(error){
    res.status(400).json({message:'post not created'});
  }
})


module.exports = router;