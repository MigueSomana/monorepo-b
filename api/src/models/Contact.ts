import mongoose, { Schema, Document } from 'mongoose';
import { IContact } from '../types';

// Schema de Contacto
const ContactSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  }
},{versionKey: false });

export default mongoose.model<IContact & Document>('Contact', ContactSchema);