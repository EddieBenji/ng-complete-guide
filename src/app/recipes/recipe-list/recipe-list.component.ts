import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: [ './recipe-list.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(1, 'A Test Recipe',
      'This is a description', 'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg'),
    new Recipe(2, 'A Second Test Recipe',
      'This is a second description', 'https://cdn.pixabay.com/photo/2016/02/02/15/33/dishes-1175493_960_720.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  ngOnInit() {
  }

  onRecipeSelected(recipeSelected: Recipe) {
    this.recipeWasSelected.emit(recipeSelected);
  }

}
