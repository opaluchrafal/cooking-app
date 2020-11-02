import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
    return this.http.get<Recipe[]>(url + 'recipes.json')
    .pipe(
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
