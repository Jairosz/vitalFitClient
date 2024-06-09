import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../types/userresponse';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<UserResponse> {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera de la petición
      'Content-Type': 'application/json' // Especifica el tipo de contenido de la petición
    });

    return this.http.get<UserResponse>(`${API_URL}/users/${userId}`, { headers });
  }

  updateUserInfo(userId: string, userData: Partial<UserResponse>): Observable<any> {
    const token = localStorage.getItem("token");

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Incluye el token en la cabecera de la petición
      'Content-Type': 'application/json' // Especifica el tipo de contenido de la petición
    });

    return this.http.put(`${API_URL}/users/update/${userId}`, userData, { headers });
  }
}