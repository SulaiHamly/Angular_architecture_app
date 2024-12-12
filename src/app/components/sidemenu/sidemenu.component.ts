import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-sidemenu',
  imports: [],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {

  constructor(private router: Router) {
    
  }

  ngOnInit(){

      const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
      const sidebarInstance = new Offcanvas(sidebarElement);
      sidebarInstance.show();
    }
    

  }

  // Method to close the sidebar
  closeSidebar() {
    const sidebarElement = document.getElementById('sidebar');
    if (sidebarElement) {
      const sidebarInstance = Offcanvas.getInstance(sidebarElement) || new Offcanvas(sidebarElement);
      sidebarInstance.hide();
    }
  }

  onClick(route: string) {
   //this.closeSidebar();
    this.router.navigate([route]);
  }
}
