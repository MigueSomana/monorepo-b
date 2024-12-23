import express from 'express';
import { operationController } from '../controllers/operationController';
import { operationValidators, businessValidators } from '../middleware/validation';

const router = express.Router();

router.post('/operations', 
  operationValidators.create,
  businessValidators.contactExists,
  businessValidators.sufficientFunds,
  operationController.create
);

router.get('/operations/contact/:contactId', 
  operationValidators.getByContact,
  businessValidators.contactExists,
  operationController.getByContact
);

export default router;