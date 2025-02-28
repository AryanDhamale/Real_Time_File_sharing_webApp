import express from "express";
import cors from "cors";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from "path";

const app=express();
const storage=multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,"./uploads");
    },
    filename : function(req,file,cb){
        cb(null,`${file.originalname}`);
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

const start=()=>{

   app.post("/sendFile",upload.single("Hero"),(req,res,next)=>{
      res.status(200).json({message:"accepted!"});
      console.log("hit me");
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
          console.log("sent successfully");
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

  app.post("/delete",(req,res,next)=>{
    console.log(req.body);
    const {fileName}=req.body;
    fs.unlink(path.join(__dirname,"uploads",fileName),function(err){
      if(err) {
        console.log(err);
        res.status(503);
        return ;
      }else {
        console.log("moved to trash!");
        res.status(200).json({message:"moved-to-trash"});
        return;
      }
    });
  })


   app.all("*",(req,res,next)=>{
      res.status(404).json({message : "NOT FOUND"});
   });

    const PORT=app.get("getPort");
    app.listen(PORT,()=>{
        console.log(`Listening at port : ${PORT}`);
    });
}

start();