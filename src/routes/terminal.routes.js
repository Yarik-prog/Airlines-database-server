const Router = require("express")
const router = new Router()
const TerminalController = require("../controllers/terminal.controller")

router.post("/terminal",TerminalController.createTerminal)
router.get("/terminal",TerminalController.getAllTerminals)
router.get("/terminal/:id",TerminalController.getOneTerminal)
router.put("/terminal/:id",TerminalController.updateTerminal)
router.delete("/terminal/:id",TerminalController.deleteTerminal)

module.exports = router
