import { Component } from '@angular/core';
import {
  ApiServiceService,
  Employee,
} from '../../services/api-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  standalone: true,
  providers: [ApiServiceService],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'], 
})
export class EmployeeListComponent {
  employees: Employee[] = []; 
  filteredEmployees: Employee[] = []; 
  searchForm!: FormGroup; 

  constructor(
    private employeeService: ApiServiceService,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [''], 
    });

    this.loadEmployees();


    // this.searchForm.get('search')?.valueChanges.subscribe(() => {
    //   this.filterEmployees();
    // });
  }

  // Load employees from the API
  loadEmployees(): void {
    const apiPath = 'getemployees';
    this.employeeService.getEmployees(apiPath).subscribe(
      (data) => {
        this.employees = data.map((employee, index) => ({
          ...employee,
          sNo: index + 1,
        }));
        this.filteredEmployees = [...this.employees]; 
        console.log(this.employees);
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }


  
  openEmployeeForm(): void {
    const modalRef = this.modalService.open(EmployeeFormComponent, {
      centered: true,
    });
    modalRef.result.then(
      () => {
        this.loadEmployees();
      },
      () => {}
    );
  }

  
 
  // Filter employees based on search input
  filterEmployees(): void {
    const searchTerm = this.searchForm.value.search.trim().toLowerCase();
  
    if (!searchTerm) {
    
      this.filteredEmployees = [...this.employees];
    } else {
      this.filteredEmployees = this.employees.filter((employee) => {

        const salaryString = employee.salary.toString()
        return (
          employee.name.toLowerCase().includes(searchTerm) ||
          employee.position.toLowerCase().includes(searchTerm) || 
          employee.department.toLowerCase().includes(searchTerm) ||
          salaryString.includes(searchTerm) 
        );
      });
    }
  }
  

  // Edit an employee
  editEmployee(employee: Employee): void {
    const modalRef = this.modalService.open(EmployeeFormComponent, {
      centered: true,
    });
    modalRef.componentInstance.id = employee._id; 
    modalRef.result.then(
      () => {
        this.loadEmployees();
      },
      () => {}
    );
  }

  // Delete an employee
  deleteEmployee(employee: Employee): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to delete employee ${employee.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const apiPath = 'delete-employees';
        this.employeeService.deleteEmployee(employee._id, apiPath).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              `Employee ${employee.name} has been deleted.`,
              'success'
            ).then(() => {
              this.loadEmployees();
            });
          },
          (error) => {
            console.error('Error deleting employee:', error);
            Swal.fire(
              'Error!',
              `There was an error deleting employee ${employee.name}.`,
              'error'
            );
          }
        );
      }
    });
  }
}
