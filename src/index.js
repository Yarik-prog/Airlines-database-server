const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const companyRoutes = require("./routes/avia_company.routes")
const routeRoutes = require("./routes/route.routes")
const crewRoutes = require("./routes/crew.routes")
const staffRoutes = require("./routes/staff.routes")
const maintenanceRoutes = require("./routes/plane_maintenance.routes")
const planeRoutes = require("./routes/plane.routes")
const flightRoutes = require("./routes/flight.routes")
const terminalRoutes = require("./routes/terminal.routes")
const passengerRoutes = require("./routes/passenger.routes")
const ticketRoutes = require("./routes/ticket.routes")
const transferRoutes = require("./routes/transfer.routes")
const PORT = process.env.PORT || 8080



app.use(cors())
app.use(express.json())
app.use("/api",companyRoutes)
app.use("/api",routeRoutes)
app.use("/api",crewRoutes)
app.use("/api",staffRoutes)
app.use("/api",maintenanceRoutes)
app.use("/api",planeRoutes)
app.use("/api",flightRoutes)
app.use("/api",terminalRoutes)
app.use("/api",passengerRoutes)
app.use("/api",ticketRoutes)
app.use("/api",transferRoutes)
app.get("/",(req,res)=>{
    res.send("Server is working!!!")
})

app.listen(PORT,()=>{
    console.log(`Listen and serve on port ${PORT}...`)
})