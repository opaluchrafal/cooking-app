import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }

    const email = form.controls['email'].value;
    const password = form.controls['password'].value;

    this.isLoading = true;

    if (this.isLoginMode) {
      //...
    } else {
      this.authService.signup(email, password).subscribe(response => {
        console.log(response);
        this.isLoading = false;
      }, err => {
        console.log(err);
        this.error = 'An error occured';
        this.isLoading = false;
      });
    }

    form.reset();
  }

}
