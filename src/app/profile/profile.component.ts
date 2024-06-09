import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/users.service';
import { UserResponse } from '../types/userresponse';
import jwt_decode, { jwtDecode } from 'jwt-decode'; // Importa jwt-decode para decodificar JWTs
import { NavbarComponent } from '../home/components/navbar/navbar.component';
import { GlobalService } from '../services/global.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    public globals: GlobalService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }],
      name: [''],
      email: [''],
      role: [''],
      pfp: ['']
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.id;
      
      this.userService.getUserById(userId).subscribe((user: UserResponse) => {
        this.userForm.patchValue(user);
      }, (error) => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.error('No token found in localStorage');
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser = this.userForm.getRawValue();
      this.userService.updateUserInfo(updatedUser.id, updatedUser).subscribe(response => {
        console.log('Usuario actualizado:', response);
      }, error => {
        console.error('Error updating user:', error);
      });
    }
  }
}
