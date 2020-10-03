import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from './../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingList(): void {
    this.shoppingListService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes']);
  }
}
