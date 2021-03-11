import express from 'express';
import { submitPayment } from '../../../controllers/payment_controller';
const router = express.Router();

router.post("/", submitPayment);

export = router;