import { Component, ElementRef, inject } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavbarComponent,FooterComponent ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  private elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  themeChanged(theme: "dark" | "light"){
    if (theme == "dark"){
      this.elementRef.nativeElement.classList.add("dark-mode")
    } else {
      this.elementRef.nativeElement.classList.remove("dark-mode")
    }
  }
 }
