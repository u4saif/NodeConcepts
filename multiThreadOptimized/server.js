import express from "express";
import {Worker} from "worker_threads";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/nonblocking",(req,res)=>{
    res.status(200).send("Data from Non blocking");
})

app.get("/blocking", (req,res)=>{
    let worker = new Worker("./workerThread.js");
    
    worker.on("message",(data)=>{
        res.status(200).send({"message":"Data from Blocking","data":data});
    });

    worker.on("error",(data)=>{
        res.status(500).send({"message":"Error comming from Blocking","data":data})
    });
})

app.listen(PORT,()=>{
    console.log("🚀🚀🚀 Server is up 🚀🚀 PORT",PORT);
});

