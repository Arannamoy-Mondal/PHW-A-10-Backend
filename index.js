const express = require('expsres');
const cors = require('cors');
const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>res.send("hello"))

export default app;