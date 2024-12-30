//Interface de tipo de Operacion
export enum OperationType {
  PAGAR = 'PAGAR',
  COBRAR = 'COBRAR',
}

//Interface de operacion
export interface Operation {
  _id?: string;
  contactId: string;
  type: OperationType;
  amount: number;
}
