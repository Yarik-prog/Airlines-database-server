const Router = require("express")
const router = new Router()
const CrewControler = require("../controllers/crew.controller")

router.post("/crew",CrewControler.createCrew)
router.get("/crew",CrewControler.getAllCrews)
router.get("/crew/:id",CrewControler.getOneCrew)
router.put("/crew/:id",CrewControler.updateCrew)
router.delete("/crew/:id",CrewControler.deleteCrew)

module.exports = router
