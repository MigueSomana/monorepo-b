import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';
import { Operation } from '../models/operation';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {
  private apiUrl = "http://localhost:3000/api/contacts";
  private apiUrl2 = "http://localhost:3000/api/operations";

  constructor(private http: HttpClient) {}
  
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  createContact(contact: Omit<Contact, '_id'>): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: string, contact: Partial<Contact>): Observable<Contact> {
    return this.http.patch<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  getOperationsByContact(contactId: string): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.apiUrl2}/contact/${contactId}`);
  }

  createOperation(operation: Omit<Operation, '_id'>): Observable<Operation> {
    return this.http.post<Operation>(this.apiUrl2, operation);
  }
  
}
