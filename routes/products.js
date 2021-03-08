const router = require('express').Router();
const productController = require('../controllers/product_controller');

router.get("/", productController.getProducts);

router.get("/:id", productController.getProduct);

router.post("/", productController.addProduct);

module.exports = router;