import { Injectable } from '@angular/core'; // Importa Injectable de @angular/core
import { CanActivate, Router } from '@angular/router'; // Importa CanActivate y Router de @angular/router
import { AuthService } from '../services/auth.service'; // Importa AuthService del directorio de servicios

@Injectable({
  providedIn: 'root',
}) // Declara que esta clase se proporcionará en el nivel raíz
export class AuthGuard implements CanActivate { // Declara la clase AuthGuard que implementa CanActivate

  constructor(private authService: AuthService, private router: Router) {} // Define el constructor con inyección de dependencias para AuthService y Router

  canActivate(): boolean { // Define el método canActivate que retorna un booleano
    if (this.authService.isLoggedIn()) { // Verifica si el usuario está logueado llamando a isLoggedIn de AuthService
      return true; // Retorna true si el usuario está logueado
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de login si no está logueado
      return false; // Retorna false si el usuario no está logueado
    }
  }
}
