import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'EmployeeManagerApp';

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response) => {
        this.employees = response;
      }
    );
  }
}