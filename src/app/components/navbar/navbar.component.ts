import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdown } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() menuToggle = new EventEmitter<void>();

  constructor(private router: Router){}

  ngOnInit(): void {
   
  }

  toggleSidebar() {
    this.menuToggle.emit();
  }


  onProfileClick(){
   console.log("Logout")
    localStorage.setItem("isLogedin", "false");
    localStorage.clear()
    this.router.navigate(['/login']);
  }
}
