import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from "path";
import {DeleteDocfromFireBase} from "./helper/helper.js";

const app=express();
const storage=multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./uploads");
    },
    filename : function(req,file,cb){
        cb(null,`${file.originalname}`);
        appendOtp({name:file.originalname,time:new Date()});
    },
});

const upload=multer({storage});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("getPort",(process.env.PORT || 8080));
app.use(cors({
 origin : "*",
 methods : ["GET","POST"]
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//  OTP VALIDATION START // 
let otpStorage=[];

const appendOtp=(file)=>{
  otpStorage.push(file);
}

const removeOtp=(fileName)=>{
  otpStorage=otpStorage.filter((file,idx)=>file.name!=fileName);
}

const callFs=(err)=>{
  if(err){
    console.log({fs:"unlick",err});
    return;
  }else {
    console.log("FLUSH-OUT");
  }
}

const cleanupExiredOTPs=async()=>{
  const now=new Date();
  const trash=[];
  otpStorage= otpStorage.filter((file,idx)=>{
    let diff=(now-file.time)/1000/60;
    if(diff<=1) return true ; 
    else {
      trash.push(file);
      return false;
    }
  });

  for(let i=0;i<trash.length;i++)
  {
    const OTP=trash[i].name.split('-')[0];
    await DeleteDocfromFireBase(OTP);
    fs.unlink(path.join(__dirname,"uploads",trash[i].name),callFs);
  }
}

setInterval(cleanupExiredOTPs,30000);

// OTP VALIDATION END // 

const start=()=>{

   app.post("/sendFile",upload.single("Hero"),(req,res,next)=>{
      res.status(200).json({message:"accepted!"});
   });

   app.post("/getFile",(req,res,next)=>{
      const {fileName}=req.body ;
      if(!fileName){
        res.status(503).json({message:"bad request"});
        return;
      }
     const options = {
        root : path.join(__dirname,"uploads"),
        dotfiles: 'deny'
     }
     res.download(fileName,options,function(err){
        if(err){
           console.log({server:"server-side error",err});
           return ; 
        }else {
          removeOtp(fileName);
          fs.unlink(path.join(__dirname,"uploads",fileName),(err)=>{
            if(err) {
                console.log(err);
            }else {
                console.log("success");
            }
          })
        }
     });
   });

   app.all("*",(req,res,next)=>{
      res.status(404).json({message : "NOT FOUND"});
   });

    const PORT=app.get("getPort");
    app.listen(PORT,()=>{
        console.log(`Listening at port : ${PORT}`);
    });
}

start();