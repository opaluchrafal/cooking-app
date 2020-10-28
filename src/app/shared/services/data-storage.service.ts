import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';

import { Recipe } from './../../recipes/recipe.model';
import { RecipeService } from './../../recipes/recipe.service';
import { Observable } from 'rxjs';

const url = 'https://ng-recipe-book-d46f0.firebaseio.com/';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  storeRecipes(): void {
    const recipes = this.recipesService.getRecipes();
    this.http.put(url + 'recipes.json', recipes).subscribe(response => console.log(response));
  }

  fetchRecipes(): Observable<Recipe[]> {
   return this.http.get<Recipe[]>(url + 'recipes.json').pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes);
      })
    );
  }
}
