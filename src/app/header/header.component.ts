import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  userSub: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService) {}


  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
