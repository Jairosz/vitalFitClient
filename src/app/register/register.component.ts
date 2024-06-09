import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { passwordMatchValidator } from './password-match.validator';
import { API_URL } from '../config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
})
export class RegisterComponent {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private http = inject(HttpClient);
  
  submitted = false;
  emailAlreadyRegistered = false; 

  form = this.formBuilder.group({
    name: this.formBuilder.control("", { validators: [Validators.required] }),
    email: this.formBuilder.control("", { validators: [Validators.email, Validators.required] }),
    password: this.formBuilder.control("", { validators: [Validators.required] }),
    passwordConfirm: this.formBuilder.control("", { validators: [Validators.required] }),
    role: this.formBuilder.control("users") 
  }, { validators: passwordMatchValidator() });
  sendForm() {
    this.submitted = true;
    this.emailAlreadyRegistered = false; // Reset the error state

    if (this.form.valid) {
      const { name, email, password, role } = this.form.value;

      // Verificar si el correo electrónico ya está registrado
      this.http.post(API_URL +'/signup', { name, email, password, role }).subscribe(
        (response) => {
          console.log('Email sin registrar, procedemos a registrar', response);

          // Si el correo no está registrado, proceder con el registro
          this.http.post('/api/signup', { name, email, password, role }).subscribe(
            (signupResponse) => {
              console.log('Usuario Registrado', signupResponse);
              this.router.navigate(['/login']);
            },
            (signupError) => {
              console.error('No se ha podido registrar', signupError);
            }
          );
        },
        (error) => {
          if (error.status === 400) {
            // Mostrar mensaje de que el correo electrónico ya está registrado
            this.emailAlreadyRegistered = true;
          } else {
            console.error('Error verificando el correo electrónico', error);
          }
        }
      );
    }
  }
  
}


