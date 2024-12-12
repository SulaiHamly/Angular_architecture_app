import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm!: FormGroup;

  constructor( private router: Router) {
    // Initialize the form group with form controls and validation
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]), // Email format validation
      email: new FormControl('', [Validators.required, Validators.email]),// Min length validation
      message: new FormControl('', [Validators.required]),
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully. We will get back to you soon!',
        confirmButtonText: 'OK',
      }).then(() => {
       
          this.contactForm.reset();
      });
    } else {
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Please fill in all the fields before submitting.',
        confirmButtonText: 'Try Again',
      });
    }
  }
}
