const express = require("express");
const fs = require("fs");
const server = express();
const port = 3000;
server.listen(port,()=> console.log("server listening poort ",port));

server.get('/createfile',async(req,res)=>{
    const today =new Date();
    var date = today.getDate()+'-'+ (today.getMonth()+1)+'-'+today.getFullYear();
    var time= today.getHours()+'_'+today.getMinutes()+'_'+today.getSeconds();
    var dateTime =(date+'-'+time).toString();
    let filename =dateTime+'.txt';
    try{
        console.log(filename)
        fs.writeFileSync(`./myfiles/${filename}`,today.toString());
        res.status(201).send("file created with current time to view all the files go to '/'");
    } 
    catch(e){
        res.status(400).send(e);
    }
})


server.get("/",async(req,res)=>{
    try{
        const data= fs.readdirSync('./myfiles').join(`\n`);
        res.status(201).send(data);
    }
    catch(e){
        res.status(400).send(e);
    }
})