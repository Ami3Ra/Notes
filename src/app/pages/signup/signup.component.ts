import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  errMsg:string = '';
  isLoading:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name:new FormControl('' ,[Validators.required , Validators.minLength(3) , Validators.maxLength(15)]),
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]),
    age:new FormControl('' , [Validators.required]),
    phone:new FormControl('' , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })


  handelRegister():void{
    let userInfo = this.registerForm.value;
    this.isLoading = true;
    this._AuthService.signUp(userInfo).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.msg === "done"){
          this._Router.navigate(['/signin']);
          this.isLoading = false;
        }
      },
      error:(err)=>{
        this.errMsg = err.error.msg;
        this.isLoading = false
      }
    })

    
  }

}
