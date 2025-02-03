const jwt=require('jsonwebtoken');
const express = require('express');


const auth=(req,res,next)=>{
    const token=req.headers.authorization;
    jwt.verify(token,'secretkey',(err,decoded)=>{
        if(err){
            res.status(400).json({message:'invalid token'});
        }
        else{
            req.decoded=decoded.email;
            next();
        }
    })
}

module.exports=auth;