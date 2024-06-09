import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private authservice = inject(AuthService);

  submitted = false;
  invalidCredentials = false;

  form = this.formBuilder.group({
    email: this.formBuilder.control("",{validators:[Validators.email,Validators.required]}),
    password: this.formBuilder.control("",{validators:Validators.required}),
  })
  // validar form
  sendForm(){
    this.submitted = true;
    this.invalidCredentials = false;
    
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    } 
    this.authservice.login(this.form.getRawValue())
  }
  
}
