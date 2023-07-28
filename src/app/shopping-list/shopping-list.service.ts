import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  // ingredientsChanged= new EventEmitter<Ingredient[]>();
  ingredientsChanged= new Subject<Ingredient[]>();


  private ingredients: Ingredient[] = [
    new Ingredient('Tomato', 10),
    new Ingredient('Onion', 5),
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  addIngredients(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient); //use spread operator instead of map/loop
    // this.ingredientsChanged.emit(this.ingredients.slice());
    this.ingredientsChanged.next(this.ingredients.slice());

   
  }
}
