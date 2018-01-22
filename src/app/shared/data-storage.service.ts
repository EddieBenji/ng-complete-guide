import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class DataStorageService {
  url = 'https://lalo-ng-recipe-book.firebaseio.com/recipeBook.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService,
              private router: Router) {
  }

  storageRecipe() {
    const token = this.authService.getToken();
    const queryParams = new HttpParams().set('auth', token);
    return this.http.put(this.url, this.recipeService.getRecipes(), { params: queryParams });
  }

  fetchRecipes() {
    const token = this.authService.getToken();
    if (!token) {
      console.log('you need to log in first!');
      this.router.navigate(['/signin']);
      return;
    }
    const queryParams = new HttpParams().set('auth', token);
    return this.http.get(this.url, { params: queryParams }).map((response: any) => {
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
