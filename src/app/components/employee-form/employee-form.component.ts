import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServiceService } from '../../services/api-service.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ApiServiceService],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  employeeForm: FormGroup;
  @Input() id!: string;
  employee: any; 

  constructor(private employeeService: ApiServiceService, private router: Router, public activeModal: NgbActiveModal) {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      position: new FormControl('', [Validators.required, Validators.minLength(3)]),
      department: new FormControl('', [Validators.required]),
      salary: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$') 
      ])
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.fetchEmployee(this.id);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.id) {
     
        let apiPath = "update-employees"
        this.employeeService.updateEmployee(this.id, apiPath, this.employeeForm.value).subscribe(
          () => {
            this.activeModal.close();  
          },
          (error) => {
            console.error('Error updating employee data:', error);
          }
        );
      } else {
      
        let apiPath = "save-employees"
        this.employeeService.addEmployee(apiPath, this.employeeForm.value).subscribe(
          () => {
            this.activeModal.close();  
          },
          (error) => {
            console.error('Error adding employee data:', error);
          }
        );
      }
    }
  }

  cancel(): void {
    this.activeModal.dismiss(); 
  }

  get name() { return this.employeeForm.get('name'); }
  get position() { return this.employeeForm.get('position'); }
  get department() { return this.employeeForm.get('department'); }
  get salary() { return this.employeeForm.get('salary'); }

  fetchEmployee(id: string): void {
    let apiPath = "getemployeesbyid";  
    this.employeeService.getEmployeeById(id, apiPath).subscribe(
      (data) => {
        this.employee = data; 

        // Set the form values based on the fetched employee data
        this.employeeForm.setValue({
          name: this.employee.name,
          position: this.employee.position,
          department: this.employee.department,
          salary: this.employee.salary
        });
      },
      (error) => {
        console.error('Error loading employee data:', error);
      }
    );
  }
}
