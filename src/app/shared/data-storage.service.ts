import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router';
import { Ingredient } from './ingredient.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../ngrx-store/app.reducers';
import * as fromAuth from '../auth/ngrx-store/auth.reducers';

@Injectable()
export class DataStorageService {
  url = 'https://lalo-ng-recipe-book.firebaseio.com/recipeBook.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  storeRecipes() {
    return this.http.put(this.url, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    this.store.select('auth').switchMap(
      (authState: fromAuth.AuthState) => {
        const token = authState.token;
        if (!token) {
          console.log('you need to log in first!');
          this.router.navigate(['/signin']);
          return;
        }
        return this.http.get<Recipe[]>(this.url).map(response => {
          if (!response) {
            console.log('Nothing in the db!');
            response = [new Recipe('Burger', 'Burger-Angry-Angus',
              'http://proexpansion.com/uploads/article/image/1618/larger_hambur.jpg',
              [new Ingredient('Pan', 2)]
            )];
            return response;
          }
          for (const recipe of response) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return response;
        });
      }
    ).subscribe(
      (response) => {
        this.recipeService.setRecipes(<Recipe[]>response);
      }
    );
  }

}
