import { Injectable } from '@angular/core'; // Importa Injectable de @angular/core
import { CanActivate, Router } from '@angular/router'; // Importa CanActivate y Router de @angular/router
import { AuthService } from '../services/auth.service';  // Importa AuthService del directorio de servicios

@Injectable({
  providedIn: 'root'
}) // Declara que esta clase se proporcionará en el nivel raíz
export class AdminGuard implements CanActivate { // Declara la clase AdminGuard que implementa CanActivate

  constructor(private authService: AuthService, private router: Router) {} // Define el constructor con inyección de dependencias para AuthService y Router

  canActivate(): boolean { // Define el método canActivate que retorna un booleano
    if (this.authService.isAdmin()) { // Verifica si el usuario es administrador llamando a isAdmin de AuthService
      return true; // Retorna true si el usuario es administrador
    } else {
      this.router.navigate(['/home']); // Redirige al usuario a la página de inicio si no es administrador
      return false; // Retorna false si el usuario no es administrador
    }
  }
}
