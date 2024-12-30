import mongoose, { Schema, Document } from 'mongoose';
import { IOperation } from '../types';

// Schema de Operación
const OperationSchema: Schema = new Schema({
  contactId: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  type: {
    type: String,
    enum: ['PAGAR', 'COBRAR'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps:  { createdAt: true, updatedAt: false },
  versionKey: false 
});

export default mongoose.model<IOperation & Document>('Operation', OperationSchema);