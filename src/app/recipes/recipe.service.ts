import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  // recipeSelected = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  constructor(private shoplistService: ShoppingListService)
  {}

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chicken Tikka', 
  //     'Delicious meal', 
  //     'https://www.foodandwine.com/thmb/ErNZTmhSUt3HiOwy4JujFiQM9co=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chicken-Tikka-Kebabs-FT-RECIPE0622-3c77b6c2efa04e1c946b320c6db30a91.jpg', 
  //     [
  //       new Ingredient('Tomatoes', 10),
  //       new Ingredient('Onions', 5),
  //     ]),
  //   new Recipe(
  //     'Butter Chicken', 
  //     'My favourite', 
  //     'https://images.services.kitchenstories.io/DnuV2UQLbLsafICFmiMEUCMXXOg=/3840x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/SV0207-photo-final-2.jpg', 
  //     [
  //       new Ingredient('Butter', 3),
  //       new Ingredient('Ketchup', 1),
  //     ])
  // ];

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice(); //without slice would return the reference to original but with slice it returns a copy
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientsToShopList(ingredients: Ingredient[])
  {
    this.shoplistService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number)
  {
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
