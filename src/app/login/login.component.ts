import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator} from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup

  constructor(private fomBuilder:FormBuilder , private http : HttpClient ,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm =this.fomBuilder.group({
      email:[''],
      password:['']
    })
  }
  
  login(){
     this.http.get<any>("http://localhost:3000/signpusers")
     .subscribe(res=>{
       const user = res.find((a:any)=>{
         return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
       });
       if(user){
         alert("Login Successfull");
         this.loginForm.reset();
         this.router.navigate(['dashboard'])
       }else{
         alert("User not found")
       }
     }, err=>{
       alert("Something went wrong")
     }
     )
  }

}
