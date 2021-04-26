const Router = require("express")
const router = new Router()
const TicketController = require("../controllers/ticket.controller")

router.post("/ticket",TicketController.createTicket)
router.get("/ticket",TicketController.getAllTickets)
router.get("/ticket/:id",TicketController.getOneTicket)
router.put("/ticket/:id",TicketController.updateTicket)
router.delete("/ticket/:id",TicketController.deleteTicket)
router.post("/ticket/query",TicketController.getTicketsQuery)

module.exports = router
