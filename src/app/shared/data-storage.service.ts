import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    
    serverEndpoint = 'https://ng-aa-recipe-book-default-rtdb.firebaseio.com';

    constructor(private http: HttpClient,
        private recipeService: RecipeService)
    {}

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        const url = this.serverEndpoint + '/recipes.json'
        this.http.put(url, recipes)
            .subscribe((response)=>{
                console.log("### firebase PUT:", response);
        });
    }

    fetchRecipes(){
        const url = this.serverEndpoint + '/recipes.json'
        return this.http.get<Recipe[]>(url).pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })

        }), tap(recipes => {
            console.log("#### GET recipes:", recipes);
            this.recipeService.setRecipes(recipes);
        }))
        
        // .subscribe((recipes) => {
        //     console.log("#### GET recipes:", recipes);
        //     this.recipeService.setRecipes(recipes);
        // })
    }

}