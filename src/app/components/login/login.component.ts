import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private appComponent: AppComponent, private router: Router) {
    // Initialize the form group with form controls and validation
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]), // Email format validation
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),// Min length validation
      rememberMe: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {

    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login attempt:', this.loginForm.value);
      localStorage.setItem("isLogedin", "true");
      this.router.navigate(['/home']);
    } else {
      console.log('Form is invalid');
    }
  }


  onSignupClick(){
    this.router.navigate(['/register']);
  }
}
