import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Ingredient } from './ingredient.model';

@Injectable()
export class DataStorageService {
  url = 'https://lalo-ng-recipe-book.firebaseio.com/recipeBook.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router) {
  }

  storeRecipes() {
    return this.http.put(this.url, this.recipeService.getRecipes());
    // const req = new HttpRequest('PUT', this.url, this.recipeService.getRecipes(), {
    //   reportProgress: true, params: queryParams
    // });
    // return this.http.request(req);
  }

  fetchRecipes() {
    const token = this.authService.getToken();
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
    })
      .subscribe(
        (response) => {
          this.recipeService.setRecipes(<Recipe[]>response);
        }
      );
  }

}
