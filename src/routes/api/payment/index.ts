import express from 'express';
import { submitPayment, getBill } from '../../../controllers/payment_controller';
const router = express.Router();

router.post("/", submitPayment)

router.get("/", getBill)

export = router;