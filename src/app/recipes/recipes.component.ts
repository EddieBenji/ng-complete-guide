import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: [ './recipes.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class RecipesComponent implements OnInit {

  constructor(private storageService: DataStorageService) {
  }

  ngOnInit() {
    this.storageService.fetchRecipes();
  }

}
