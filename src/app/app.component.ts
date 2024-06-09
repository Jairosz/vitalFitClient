import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { GlobalService } from './services/global.service';
import { UserService } from './services/users.service';
import jwt_decode, { jwtDecode } from 'jwt-decode'; // Importa jwt-decode para decodificar JWTs
import { DecodedToken } from './types/decodedToken';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';

  constructor(private authservice: AuthService, private globals: GlobalService, private userservice : UserService) { this.isLoggedIn()}

  isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) { 
      const decodedToken = jwtDecode<DecodedToken>(token); // Decodifica el token
      this.userservice.getUserById(decodedToken.id).subscribe((response)=>{
        this.globals.usuario = response;
      })
    }
  }
}
