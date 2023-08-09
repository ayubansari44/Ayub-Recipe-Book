import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[];
  // ingrChangeSubsc: Subscription; //previous
  subscription: Subscription;


  constructor(private shoplistService: ShoppingListService)
  {}

  ngOnInit(): void {
    this.ingredients = this.shoplistService.getIngredients();
    this.subscription = this.shoplistService.ingredientsChanged.subscribe((changedIngredients: Ingredient[]) => {
      this.ingredients = changedIngredients
    })
  }

  onEditItem(index: number){
    this.shoplistService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //begin forms module
  }

  ngAfterViewChecked(): void{
  }
}
