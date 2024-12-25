export enum OperationType {
    BUY = 'BUY',
    SELL = 'SELL'
  }
  
  export interface Operation {
    _id?: string;
    contactId: string;
    type: OperationType;
    amount: number;
  }