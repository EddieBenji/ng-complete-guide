import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: [ './recipes.component.css' ],
  encapsulation: ViewEncapsulation.None,
  providers: [ RecipeService ]
})
export class RecipesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
