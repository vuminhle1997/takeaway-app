import express from 'express';
import productsRoute from './products';
import paymentRoute from './payment';
const router = express.Router();

router.use("/products", productsRoute);
router.use("/payment", paymentRoute);

export = router;