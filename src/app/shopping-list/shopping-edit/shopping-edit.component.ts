import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', {static: true}) shoppinglistForm: NgForm; 
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoplistService: ShoppingListService)
  {}

  ngOnInit(): void{
    this.subscription = this.shoplistService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoplistService.getIngredient(index);
        this.shoppinglistForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onClear(){
    this.shoppinglistForm.reset();
    this.editMode = false;
  }

  onSubmit(form: NgForm): void{
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoplistService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    else{
      this.shoplistService.addIngredient(newIngredient);
    }
    
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.shoplistService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
