import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';  
export interface Employee {
  _id: number;
  sNo: number;
  name: string;
  position: string;
  department: string;
  salary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'http://localhost:3000/api/';  

  constructor(private http: HttpClient) { }


  getEmployees(apiPath:any): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl+apiPath); 
  }

  getEmployeeById(id: any,apiPath:any): Observable<Employee[]> {
    const url = `${this.apiUrl}/${apiPath}/${id}`; 
    return this.http.get<Employee[]>(url); 
  }

  addEmployee(apiPath:any, employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl+apiPath, employee); 
  }


  updateEmployee(id: any,apiPath:any, employee: Employee): Observable<Employee> {
    const url = `${this.apiUrl}/${apiPath}/${id}`; 
    return this.http.put<Employee>(url, employee);
  }


  deleteEmployee(id: any, apiPath:any): Observable<void> {
    const url = `${this.apiUrl}/${apiPath}/${id}`;
    return this.http.delete<void>(url);  
  }
}
