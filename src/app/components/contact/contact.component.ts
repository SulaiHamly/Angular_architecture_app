import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;

  constructor( private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required]], 
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required]],
    })  
  }


  onSubmit() {
    if (this.contactForm.valid) {
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Your message has been sent successfully. We will get back to you soon!',
        confirmButtonText: 'OK',
      }).then(() => {
       
          this.contactForm.reset();
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Please fill in all the fields before submitting.',
        confirmButtonText: 'Try Again',
      });
    }
  }
}
