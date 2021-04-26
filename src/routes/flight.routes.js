const Router = require("express")
const router = new Router()
const FlightControler = require("../controllers/flight.controller")

router.post("/flight",FlightControler.createFlight)
router.get("/flight",FlightControler.getAllFlights)
router.get("/flight/:id",FlightControler.getOneFlight)
router.put("/flight/:id",FlightControler.updateFlight)
router.delete("/flight/:id",FlightControler.deleteFlight)
router.post("/flight/query",FlightControler.getFlightsQuary)
router.post("/flight/test",FlightControler.testQuary)

module.exports = router
