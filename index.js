const express = require('express');
const cors = require('cors');
const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>res.send("hello"))
// app.listen(5000,()=>console.log("hello"))
export default app;