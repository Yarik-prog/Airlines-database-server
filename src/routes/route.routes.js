const Router = require("express")
const router = new Router()
const RouteController = require("../controllers/route.controller")

router.post("/route",RouteController.createRoute)
router.get("/route",RouteController.getAllRoutes)
router.get("/route/:id",RouteController.getOneRoute)
router.put("/route/:id",RouteController.updateRoute)
router.delete("/route/:id",RouteController.deleteRoute)
router.post("/route/query",RouteController.getRoutesByCountry)

module.exports = router
