import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/directives/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  constructor(private authService: AuthService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

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

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(() => {
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, errorMessage => {
      this.error = errorMessage;
      this.showErrorAlert(errorMessage);
      this.isLoading = false;
    });

    form.reset();
  }

  onCloseAlert(): void {
    this.error = null;
  }

  private showErrorAlert(message: string): void {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
