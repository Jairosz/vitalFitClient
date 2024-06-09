import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/users.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private router: Router, private userService: UserService, public globals: GlobalService) {}


  closeSession() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
