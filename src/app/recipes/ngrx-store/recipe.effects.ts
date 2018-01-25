import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromRecipe from '../ngrx-store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  private url = 'https://lalo-ng-recipe-book.firebaseio.com/recipeBook.json';

  @Effect()
  recipeFetch = this.actions$.ofType(RecipeActions.FETCH_RECIPES)
    .switchMap(
      (action: RecipeActions.FetchRecipes) => {
        return this.http.get<Recipe[]>(this.url);
      }
    ).map(response => {
      response = response || [];
      for (const recipe of response) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return {
        type: RecipeActions.SET_RECIPES,
        payload: response
      };
    });

  @Effect({ dispatch: false })
  recipeStore = this.actions$.ofType(RecipeActions.STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      return this.http.put(this.url, state.recipes);
    });


  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<fromRecipe.RecipeFeatureState>) {
  }
}
