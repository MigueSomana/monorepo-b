import { Request, Response } from "express";
import mongoose from "mongoose";
import Contact from "../models/Contact";
import Operation from "../models/Operation";
import { APIResponse, IOperation } from "../types";

// Controlador de operaciones
export const operationController = {
  // Crear operación (con transacción)
  async create(req: Request, res: Response) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { contactId, type, amount } = req.body;
      const contact = await Contact.findById(contactId).session(session);
      if (!contact) {
        throw new Error("Contact not found");
      }

      // Crear la operación
      const operation = new Operation({
        contactId,
        type,
        amount,
      });

      const balanceChange = type === "PAGAR" ? -amount : type === "COBRAR" ? amount : 0;
      const newBalance = contact.balance + balanceChange;

      if (newBalance < 0) {
        throw new Error("Insufficient funds");
      }

      await operation.save({ session });
      contact.balance = newBalance;
      await contact.save({ session });

      await session.commitTransaction();

      const response: APIResponse<IOperation> = {
        success: true,
        data: operation,
      };
      res.status(201).json(response);
    } catch (error) {
      await session.abortTransaction();
      const response: APIResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error creating operation",
      };
      res.status(400).json(response);
    } finally {
      session.endSession();
    }
  },

  // Obtener operaciones por contacto
  async getByContact(req: Request, res: Response) {
    try {
      const operations = await Operation.find({
        contactId: req.params.contactId,
      }).sort({ date: -1 });

      const response: APIResponse<IOperation[]> = {
        success: true,
        data: operations,
      };
      res.json(response);
    } catch (error) {
      const response: APIResponse<null> = {
        success: false,
        error: "Error fetching operations",
      };
      res.status(500).json(response);
    }
  },
  // Obtener todas las operaciones
  async getAll(req: Request, res: Response) {
    try {
      const operations = await Operation.find().sort({ createdAt: -1 });
      const response: APIResponse<IOperation[]> = {
        success: true,
        data: operations,
      };
      res.json(response);
    } catch (error) {
      const response: APIResponse<null> = {
        success: false,
        error: "Error fetching contacts",
      };
      res.status(500).json(response);
    }
  },
};
