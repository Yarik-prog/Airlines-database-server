const Router = require("express")
const router = new Router()
const MaintenanceController = require("../controllers/plane_maintenance.controller")

router.post("/maintenance",MaintenanceController.createMaintence)
router.get("/maintenance",MaintenanceController.getAllMaintences)
router.get("/maintenance/:id",MaintenanceController.getOneMaintence)
router.put("/maintenance/:id",MaintenanceController.updateMaintence)
router.delete("/maintenance/:id",MaintenanceController.deleteMaintence)
router.post("/maintenance/query",MaintenanceController.getMaintenceQuery)

module.exports = router
