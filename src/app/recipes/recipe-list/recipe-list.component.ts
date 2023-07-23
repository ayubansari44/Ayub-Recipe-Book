import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  
  recipes: Recipe[];
  // [
  //   new Recipe('Chicken Tikka', 'Delicious meal', 'https://www.foodandwine.com/thmb/ErNZTmhSUt3HiOwy4JujFiQM9co=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Chicken-Tikka-Kebabs-FT-RECIPE0622-3c77b6c2efa04e1c946b320c6db30a91.jpg'),
  //   new Recipe('Butter Chicken', 'My favourite', 'https://images.services.kitchenstories.io/DnuV2UQLbLsafICFmiMEUCMXXOg=/3840x0/filters:quality(85)/images.kitchenstories.io/wagtailOriginalImages/SV0207-photo-final-2.jpg')
  // ];
  constructor(private recipeService: RecipeService, 
              private router: Router, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
