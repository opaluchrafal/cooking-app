import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable( {providedIn: 'root'} )
export class AuthService {

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<Object> {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxEKl-iIvUApw-jN8arAgTbM27EOGSUG4', {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
}
