import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/loginresponse';
import jwt_decode, { jwtDecode } from 'jwt-decode'; // Importa jwt-decode para decodificar JWTs
import { GlobalService } from './global.service';
import { DecodedToken } from '../types/decodedToken';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | null = null; // Variable para almacenar el token de autenticación



  constructor(private router: Router, private http: HttpClient, private globals : GlobalService) { } // Inyección de dependencias del Router y HttpClient

  // Método para manejar el inicio de sesión
  login(credentials: { email: string | null; password: string | null; }) {
    this.http.post<LoginResponse>(API_URL+"/login", credentials).subscribe({
      next: (response) => {
        this.token = response.token; // Guarda el token en la variable local
        this.globals.usuario = response.user;
        localStorage.setItem("token", this.token); // Guarda el token en el localStorage

        // Redirige al usuario basado en su rol
        if (response.user.role === "admin") {
          this.router.navigateByUrl("/admin");
        } else {
          this.router.navigateByUrl("/home");
        }
      },
    });
  }

  // Método para verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem("token"); // Devuelve true si hay un token en el localStorage
  }

  // Método para verificar si el usuario es administrador
  isAdmin(): boolean {
    const token = localStorage.getItem("token"); // Obtiene el token del localStorage

    if (!token) {
      return false; // Devuelve false si no hay token
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token); // Decodifica el token
      return decodedToken.role === 'admin'; // Verifica si el rol en el token es 'admin'
    } catch (error) {
      console.error("Error decoding token:", error); // Muestra un error si falla la decodificación
      return false; // Devuelve false en caso de error
    }
  }
}
