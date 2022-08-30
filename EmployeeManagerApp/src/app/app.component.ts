import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { faEnvelope, faPencilAlt, faPhone, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  faPencil = faPencilAlt;
  faTimes = faTimes;
  faEnvelope = faEnvelope;
  faPhone = faPhone;

  title = 'EmployeeManagerApp';

  employees: Employee[] = [];
  editEmployee!: Employee | null;
  deleteEmployee!: Employee | null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response) => {
        this.employees = response;
      }
    );
  }

  public searchEmployees(key: string): void {
    const result: Employee[] = [];
    for(const employee of this.employees) {
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        result.push(employee);
      }
    }
    this.employees = result;
    console.log("key: "+key+" result: "+result);

    if(result.length == 0 || !key) {
      this.getEmployees();
    }
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      }
    )
    addForm.reset();
  }

  public onUpdateEmployee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      }
    )
  }

  public onDeleteEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      }
    )
  }

  public onOpenModal(employee: Employee | null, mode: String) {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');

    if(mode === 'add') {
      button.setAttribute('data-target','#addEmployeeModal');
    }

    else if(mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target','#updateEmployeeModal');
    }

    else if(mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
  }
}
