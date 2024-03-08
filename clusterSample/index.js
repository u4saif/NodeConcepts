import express from "express";

const PORT = process.env.port || 3000;
const app = express();

app.get("/inode",(req,res)=>{
    console.log(req.query);
    res.status(200).send({"message":"Hello from NODE cluster"});
});
app.listen(PORT,()=>{
    console.log("Server started as PORT🚀🚀🚀",PORT);
})