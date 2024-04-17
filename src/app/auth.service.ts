import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}
export interface Product {
  id: number;
  Name: string;
  Manufacturer: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44323/token';
  private productApiUrl = 'https://localhost:44323/api/Products';
  private currentToken = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }
  
  getToken():Observable<any>{
    const body =  new URLSearchParams();
    body.set('Username', 'Abc@gmail.com');
    body.set('Password', '123456789');
    body.set('grant_type', 'password');
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post<TokenResponse>(this.apiUrl, body.toString(), { headers: headers }).pipe(
      tap(data => this.currentToken.next(data.access_token))
    );
  }

  getProducts(): Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':`Bearer ${this.currentToken.getValue()}`
    });
    return this.http.get(this.productApiUrl, { headers: headers });
  }

  createProduct(product: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentToken.getValue()}`
    });

    return this.http.post(this.productApiUrl, product, { headers: headers });
  }

  updateProduct(id:number, product:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentToken.getValue()}`
    });
    const url = `${this.productApiUrl}/${id}`;

    return this.http.put(url, product, { headers: headers });
  }

  deleteProduct(id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentToken.getValue()}`
    });
    const url = `${this.productApiUrl}/${id}`;
    return this.http.delete(url,  { headers: headers });
  }
}
