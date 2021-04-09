const Router = require("express")
const router = new Router()
const AviaCompanyController = require("../controllers/aviaCompany.controller")

router.post("/company",AviaCompanyController.createCompany)
router.get("/company",AviaCompanyController.getAllCompany)
router.get("/company/:id",AviaCompanyController.getOneCompany)
router.put("/company/:id",AviaCompanyController.updateCompany)
router.delete("/company/:id",AviaCompanyController.deleteCompany)

module.exports = router
