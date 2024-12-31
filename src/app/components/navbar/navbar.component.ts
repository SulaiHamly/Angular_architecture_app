import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown, Offcanvas } from 'bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'], // Pluralized to styleUrls
})
export class NavbarComponent implements OnInit {
  @Output() menuToggle = new EventEmitter<void>();
  isDarkMode = false;
  constructor(private router: Router, private renderer: Renderer2) {
    const savedTheme = localStorage.getItem('theme');
    console.log('Saved theme from localStorage:', savedTheme); // Debug log
    this.isDarkMode = savedTheme === 'dark';
    this.updateTheme();
  }

  ngOnInit(): void {}

  toggleSidebar() {
     const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
      const sidebarInstance = new Offcanvas(sidebarElement);
      sidebarInstance.show();
    }
  }

  onProfileClick() {
    console.log('Logout');
    Swal.fire({
      icon: 'warning',
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      showCancelButton: true, 
      confirmButtonText: 'OK', 
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('isLogedin', 'false');
        localStorage.clear();
        this.router.navigate(['/login']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('Logout cancelled');
      }
    });
  }
  

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      this.renderer.removeClass(document.body, 'light-mode');
    } else {
      this.renderer.addClass(document.body, 'light-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }

  updateTheme(): void {
    console.log('Updating theme. Is dark mode:', this.isDarkMode); // Debug log
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
      this.renderer.removeClass(document.body, 'light-mode');
    } else {
      this.renderer.addClass(document.body, 'light-mode');
      this.renderer.removeClass(document.body, 'dark-mode');
    }
  }
}
