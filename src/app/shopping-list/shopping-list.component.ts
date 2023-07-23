import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit{
  ingredients: Ingredient[];

  constructor(private shoplistService: ShoppingListService)
  {}

  ngOnInit(): void {
    this.ingredients = this.shoplistService.getIngredients();
    console.log("###Ingredients in shoppingList:", this.ingredients);
    this.shoplistService.ingredientsChanged.subscribe((changedIngredients: Ingredient[]) => {
      this.ingredients = changedIngredients
    })
  }

  ngAfterViewChecked(): void{
  }
}
