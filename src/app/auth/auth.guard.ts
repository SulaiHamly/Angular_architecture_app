import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isLoggedIn: any = localStorage.getItem("isLogedin"); // Replace with real authentication logic

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn == "true") {
      return true;
    } else {
      this.router.navigate(['/']); // Redirect to login
      return false;
    }
  }

  // Method to set login status (for demo purposes)
  login() {
    this.isLoggedIn = '';
  }
}
