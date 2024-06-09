import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() themeChange = new EventEmitter<"dark" | "light">();
  isDark = false;

  constructor() {}

  ngOnInit(): void {
    this.initializeTheme();
  }

  toggleTheme() {
    console.log("click");
    if (this.isDark) {
      localStorage.setItem('theme', 'light');
      this.themeChange.emit('light');
      this.isDark = false;
    } else {
      localStorage.setItem('theme', 'dark');
      this.themeChange.emit('dark');
      this.isDark = true;
    }
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDark = true;
      this.themeChange.emit("dark");
      return;
    }
    this.themeChange.emit("light");
  }
}
