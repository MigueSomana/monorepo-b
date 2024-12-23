import express from 'express';
import { contactController } from '../controllers/contactController';
import { contactValidators, businessValidators } from '../middleware/validation';

const router = express.Router();

router.post('/contacts', 
  contactValidators.create,
  businessValidators.uniqueEmail,
  contactController.create
);

router.get('/contacts', 
  contactController.getAll
);

router.get('/contacts/:id', 
  contactValidators.getById,
  businessValidators.contactExists,
  contactController.getById
);

router.patch('/contacts/:id', 
  contactValidators.update,
  businessValidators.contactExists,
  contactController.update
);

export default router;