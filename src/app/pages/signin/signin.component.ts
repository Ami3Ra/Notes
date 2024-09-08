import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){}
  errMsg:string = '';
  isLoading:boolean = false;

  loginForm:FormGroup = new FormGroup({
    email:new FormControl('' , [Validators.required , Validators.email]),
    password:new FormControl('' , [Validators.required , Validators.pattern(/^[A-Z][a-z0-9]{3,8}$/)]), 
  })


  handelLogin():void{
    let userInfo = this.loginForm.value;
    this.isLoading = true;
    this._AuthService.signIn(userInfo).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.msg === "done"){
          localStorage.setItem('eToken' ,'3b8ny__' + response.token);
          this._AuthService.setUserToken();
          this._Router.navigate(['/notes']);
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
