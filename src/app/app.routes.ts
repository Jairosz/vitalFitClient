import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/is-authenticated.guard'; 
import { FoodsComponent } from './foods/foods.component';
import { SharedComponent } from './shared/shared.component';
import { TipsComponent } from './tips/tips.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './guards/is-admin.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]}, 
  { path: 'foods', component: FoodsComponent, canActivate: [AuthGuard]},
  { path: 'shared', component: SharedComponent, canActivate: [AuthGuard]},
  { path: 'tips', component: TipsComponent, canActivate: [AuthGuard]},
  { path: 'exercises', component: ExercisesComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: '', redirectTo: '/landing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
