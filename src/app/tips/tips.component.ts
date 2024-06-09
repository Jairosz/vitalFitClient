import { Component } from '@angular/core';
import { NavbarComponent } from '../home/components/navbar/navbar.component';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent {

}
