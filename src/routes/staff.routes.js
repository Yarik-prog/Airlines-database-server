const Router = require("express")
const router = new Router()
const StaffController = require("../controllers/staff.controller")

router.post("/staff",StaffController.createStaff)
router.get("/staff",StaffController.getAllStaff)
router.get("/staff/:id",StaffController.getOneStaff)
router.put("/staff/:id",StaffController.updateStaff)
router.delete("/staff/:id",StaffController.deleteStaff)
router.post("/staff/query",StaffController.getStaffQuary)

module.exports = router
