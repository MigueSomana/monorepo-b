import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { APIResponse, IContact } from '../types';

export const contactController = {
  // Crear contacto
  async create(req: Request, res: Response) {
    try {
      const contact = new Contact({
        email: req.body.email,
        name: req.body.name,
        balance: 0 // Balance inicial siempre es 0
      });

      await contact.save();
      const response: APIResponse<IContact> = {
        success: true,
        data: contact
      };
      res.status(201).json(response);
    } catch (error) {
      const response: APIResponse<null> = {
        success: false,
        error: error instanceof Error ? error.message : 'Error creating contact'
      };
      res.status(400).json(response);
    }
  },

  // Obtener todos los contactos
  async getAll(req: Request, res: Response) {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      const response: APIResponse<IContact[]> = {
        success: true,
        data: contacts
      };
      res.json(response);
    } catch (error) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Error fetching contacts'
      };
      res.status(500).json(response);
    }
  },

  // Obtener un contacto por ID
  async getById(req: Request, res: Response) {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({
          success: false,
          error: 'Contact not found'
        });
      }
      const response: APIResponse<IContact> = {
        success: true,
        data: contact
      };
      res.json(response);
    } catch (error) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Error fetching contact'
      };
      res.status(500).json(response);
    }
  },

  // Actualizar contacto (solo nombre)
  async update(req: Request, res: Response) {
    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );
      if (!contact) {
        return res.status(404).json({
          success: false,
          error: 'Contact not found'
        });
      }
      const response: APIResponse<IContact> = {
        success: true,
        data: contact
      };
      res.json(response);
    } catch (error) {
      const response: APIResponse<null> = {
        success: false,
        error: 'Error updating contact'
      };
      res.status(500).json(response);
    }
  }
};