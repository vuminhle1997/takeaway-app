const router = require("express").Router();
const products = require("./products");
const payment = require("./payment");

router.use("/products", products);
router.use("/payment", payment);

module.exports = router;