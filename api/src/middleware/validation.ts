import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

// Función helper para validar ObjectId
const isValidObjectId = (value: string) => mongoose.Types.ObjectId.isValid(value);

// Middleware para manejar errores de validación
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.type,
        message: err.msg
      }))
    });
  }
  next();
};

// Validaciones para Contactos
export const contactValidators = {
  create: [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Debe proporcionar un email válido')
      .normalizeEmail()
      .toLowerCase(),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('El nombre es requerido')
      .isLength({ min: 2, max: 50 })
      .withMessage('El nombre debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage('El nombre solo puede contener letras y espacios'),
    handleValidationErrors
  ],
  
  update: [
    param('id')
      .custom(isValidObjectId)
      .withMessage('ID de contacto inválido'),
    body('name')
      .trim()
      .notEmpty()
      .withMessage('El nombre es requerido')
      .isLength({ min: 2, max: 50 })
      .withMessage('El nombre debe tener entre 2 y 50 caracteres')
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      .withMessage('El nombre solo puede contener letras y espacios'),
    handleValidationErrors
  ],

  getById: [
    param('id')
      .custom(isValidObjectId)
      .withMessage('ID de contacto inválido'),
    handleValidationErrors
  ]
};

// Validaciones para Operaciones
export const operationValidators = {
  create: [
    body('contactId')
      .custom(isValidObjectId)
      .withMessage('ID de contacto inválido'),
    body('type')
      .trim()
      .isIn(['BUY', 'SELL'])
      .withMessage('El tipo debe ser BUY o SELL'),
    body('amount')
      .isFloat({ min: 0.01, max: 999999.99 })
      .withMessage('El monto debe ser un número positivo menor a 1,000,000')
      .custom((value) => {
        // Validar que solo tenga 2 decimales
        const decimals = value.toString().split('.')[1];
        if (decimals && decimals.length > 2) {
          throw new Error('El monto solo puede tener 2 decimales');
        }
        return true;
      }),
    handleValidationErrors
  ],

  getByContact: [
    param('contactId')
      .custom(isValidObjectId)
      .withMessage('ID de contacto inválido'),
    handleValidationErrors
  ]
};

// Validaciones de negocio personalizadas
export const businessValidators = {
  // Validar que el contacto existe
  contactExists: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Contact = mongoose.model('Contact');
      const contactId = req.params.id || req.params.contactId || req.body.contactId;
      const contact = await Contact.findById(contactId);

      if (!contact) {
        return res.status(404).json({
          success: false,
          error: 'Contacto no encontrado'
        });
      }

      // Agregar el contacto a res.locals para uso posterior
      res.locals.contact = contact;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al validar el contacto'
      });
    }
  },

  sufficientFunds: async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.type === 'DEBIT') {
        const contact = res.locals.contact;
        if (contact.balance < req.body.amount) {
          return res.status(400).json({
            success: false,
            error: 'Fondos insuficientes'
          });
        }
      }
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al validar los fondos'
      });
    }
  },

  // Validar email único
  uniqueEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Contact = mongoose.model('Contact');
      const existingContact = await Contact.findOne({ 
        email: req.body.email.toLowerCase() 
      });
      
      if (existingContact) {
        return res.status(400).json({
          success: false,
          error: 'El email ya está registrado'
        });
      }
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error al validar email'
      });
    }
  }
};