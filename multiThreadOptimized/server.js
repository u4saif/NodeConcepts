import express from "express";
import {Worker} from "worker_threads";
const THREADS = 3;

const app = express();
const PORT = process.env.PORT || 3000;

const createThread = ()=>{
    return new Promise((resolve,reject)=>{
        let worker = new Worker("./workerThread.js",{
            workerData:{"THREAD_COUNT":THREADS}
        });
        worker.on("message",(data)=>  resolve(data));
        worker.on('error',(data)=> reject(data));
    })
}

app.get("/nonblocking",(req,res)=>{
    res.status(200).send({"data":`Data from Non blocking:ID ${req.query?.id}`});
})

app.get("/blocking", async (req,res)=>{
    let workers=[]
    for(let i = 0; i< THREADS; i++){
        workers[i] = createThread();
    }
    const results = await Promise.all(workers);
    const finalResult = results[0]+results[1]+results[2];
    res.status(200).send({"message":`Data from Blocking :ID ${req.query?.id}`,"data":finalResult});
})

app.listen(PORT,()=>{
    console.log("🚀🚀🚀 Server is up 🚀🚀 PORT",PORT);
});

