import express from 'express'
import { verifyUserAuth } from '../middleware/userAuth.js';
import { processPayment, sendApiKey } from '../controllers/paymentController.js';

const router = express.Router();

router.route('/payment/process').post(verifyUserAuth, processPayment)
router.route('/getKey').get(verifyUserAuth, sendApiKey)

export default router;