import express from 'express';
import { createProduct, getProducts, getProductById } from '../../../controllers/product_controller';
const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", createProduct);

export = router;