const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 8080

app.get("/",(req,res)=>{
    res.send("Server is working!!!")
})
app.listen(PORT,()=>{
    console.log(`Listen and serve on port ${PORT}...`)
})