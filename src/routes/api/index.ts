import express from 'express';
import productsRoute from './products';
const router = express.Router();

router.use("/products", productsRoute);

export = router;