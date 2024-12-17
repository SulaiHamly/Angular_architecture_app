import { Component, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, SidemenuComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'architecture_app';
  constructor(private router: Router, private renderer: Renderer2) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDarkMode = savedTheme === 'dark';
    if (isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      this.renderer.removeClass(document.body, 'light-mode');
    } else {
      this.renderer.addClass(document.body, 'light-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
  

  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
