const Router = require("express")
const router = new Router()
const TransferController = require("../controllers/transfer.controller")

router.post("/transfer",TransferController.createTransfer)
router.get("/transfer",TransferController.getAllTransfers)

module.exports = router
