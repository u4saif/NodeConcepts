import express from "express";
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/queue",(req,res)=>{
    res.status(200).send({
        message:"Please load your Data for processing."
    })
});

app.put("/process",(req,res)=>{
    res.status(200).send({
        message:"Please load your Data for processing."
    })
})

app.listen(PORT,()=>{
    console.log("App is running at PORT: 🚀",PORT)
})