import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { AuthService } from './../../auth/auth.service';
import { Recipe } from './../../recipes/recipe.model';
import { RecipeService } from './../../recipes/recipe.service';

const url = 'https://ng-recipe-book-d46f0.firebaseio.com/';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService) { }

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(url + 'recipes.json', recipes).subscribe();
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>(url + 'recipes.json', {
          params: new HttpParams().set('auth', user.token)
        });
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      }));
  }
}
