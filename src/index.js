const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const companyRoutes = require("./routes/avia_company.routes")
const PORT = process.env.PORT || 8080


app.use(express.json())
app.use("/api",companyRoutes)
app.get("/",(req,res)=>{
    res.send("Server is working!!!")
})

app.listen(PORT,()=>{
    console.log(`Listen and serve on port ${PORT}...`)
})