import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Wiener Schnitzel',
  //     'Wiener Schnitzel (Wienerschnitzel in Switzerland) is a very thin, breaded and fried cutlet made from veal.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1280px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French Fries', 20)
  //     ]
  //   ),
  //   new Recipe(
  //     'Burger',
  //     'Media related to Hamburger (or simply burger), a sandwich that consists of a cooked patty of ground meat (usually beef) that is fried, steamed, grilled, or broiled and is generally served with various condiments and toppings inside a sliced bun baked specially for this purpose. Hamburgers are often served with french fries, potato chips, or onion rings.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Hamburger_s_hov%C4%9Bz%C3%ADm_a_zeleninou.jpg/1280px-Hamburger_s_hov%C4%9Bz%C3%ADm_a_zeleninou.jpg',
  //     [
  //       new Ingredient('Buns', 1),
  //       new Ingredient('Meat', 20)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
