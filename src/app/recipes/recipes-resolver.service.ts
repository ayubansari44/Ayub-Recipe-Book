import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
    constructor(private datastorageService: DataStorageService, 
                private recipesService: RecipeService)
    {}

    resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       const recipes = this.recipesService.getRecipes();

       if(recipes.length == 0){
           return this.datastorageService.fetchRecipes();
       }
       else{
        return recipes;
       }

    }
}