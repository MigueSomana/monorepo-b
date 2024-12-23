export interface IContact {
  email: string;
  name: string;
  balance: number;
}

export interface IOperation {
  contactId: string;
  amount: number;
  date: Date;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
