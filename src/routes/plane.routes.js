const Router = require("express")
const router = new Router()
const PlaneController = require("../controllers/plane.controller")

router.post("/plane",PlaneController.createPlane)
router.get("/plane",PlaneController.getAllPlanes)
router.get("/plane/:id",PlaneController.getOnePlane)
router.put("/plane/:id",PlaneController.updatePlane)
router.delete("/plane/:id",PlaneController.deletePlane)
router.post("/plane/query",PlaneController.getPlanesQuary)

module.exports = router
