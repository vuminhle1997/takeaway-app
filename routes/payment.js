const router = require("express").Router();
const BillController = require("../controllers/payment_controller");

router.post("/", BillController.submitBill);    

router.put("/", (req, res) => { 
})
module.exports = router;