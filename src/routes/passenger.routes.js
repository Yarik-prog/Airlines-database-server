const Router = require("express")
const router = new Router()
const PassengerControler = require("../controllers/passenger.controller")

router.post("/passenger",PassengerControler.createPassenger)
router.get("/passenger",PassengerControler.getAllPassengers)
router.get("/passenger/:id",PassengerControler.getOnePassenger)
router.put("/passenger/:id",PassengerControler.updatePassengers)
router.delete("/passenger/:id",PassengerControler.deletePassenger)
router.post("/passenger/query",PassengerControler.getPassengerQuery)

module.exports = router
