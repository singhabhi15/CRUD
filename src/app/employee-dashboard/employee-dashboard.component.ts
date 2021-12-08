import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  display = "none";
  employeeModelObj: EmployeeModel = new EmployeeModel();
  FormValue!: FormGroup;
  employeeData:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.FormValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    })
    this.getAllEmployee();
  }
  
  openModal() {
   
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  clickAddEmployee(){
    this.FormValue.reset();
    this.showAdd = true;
    this.showUpdate =false;
  }

  postEmloyeeDetails() {  
    this.employeeModelObj.firstName = this.FormValue.value.firstName;
    this.employeeModelObj.lastName = this.FormValue.value.lastName;
    this.employeeModelObj.email = this.FormValue.value.email;
    this.employeeModelObj.mobile = this.FormValue.value.mobile;
    this.employeeModelObj.salary = this.FormValue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe (res=> {
        console.log(res);
        alert("Employee successfully added");
        let ref=document.getElementById('cancel');
        ref?.click();
        this.FormValue.reset();
        this.getAllEmployee();
      },
        err => {
          alert("Somrthing wrong");
        }
      )
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
     this.employeeData = res;
    })
  }
  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }
  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate =true;
    this.employeeModelObj.id = row.id ;
    this.FormValue.controls['firstName'].setValue(row.firstName);
    this.FormValue.controls['lastName'].setValue(row.lastName);
    this.FormValue.controls['email'].setValue(row.email);
    this.FormValue.controls['mobile'].setValue(row.mobile);
    this.FormValue.controls['salary'].setValue(row.salary);
  }
  updateEmloyeeDetails(){
    this.employeeModelObj.firstName = this.FormValue.value.firstName;
    this.employeeModelObj.lastName = this.FormValue.value.lastName;
    this.employeeModelObj.email = this.FormValue.value.email;
    this.employeeModelObj.mobile = this.FormValue.value.mobile;
    this.employeeModelObj.salary = this.FormValue.value.salary;
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfull")
      let ref=document.getElementById('cancel');
        ref?.click();
        this.FormValue.reset();
        this.getAllEmployee();
    })
  }
}
