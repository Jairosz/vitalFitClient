import { Component } from '@angular/core';
import { NavbarComponent } from '../home/components/navbar/navbar.component';

@Component({
  selector: 'app-exercises',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './exercises.component.html',
  styleUrl: './exercises.component.css'
})
export class ExercisesComponent {

}
