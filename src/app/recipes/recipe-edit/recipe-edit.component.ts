import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as RecipeActions from '../ngrx-store/recipe.actions';
import * as fromRecipe from '../ngrx-store/recipe.reducers';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public store: Store<fromRecipe.RecipeFeatureState>) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
        .take(1)
        .subscribe(
          (recipeState: fromRecipe.RecipeState) => {
            const recipe = recipeState.recipes[this.id];
            recipeName = recipe.name;
            recipeImgPath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe.ingredients.length < 1) {
              return;
            }
            for (const ingredient of recipe.ingredients) {
              recipeIngredients.push(new FormGroup({
                'name': new FormControl(ingredient.name, [Validators.required]),
                'amount': new FormControl(ingredient.amount, [
                  Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              }));
            }
          }
        );
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImgPath, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    if (this.editMode) {
      // Due to we use the same names as the model in the form, we can simply pass the
      // the value of the form!
      this.store.dispatch(new RecipeActions.UpdateRecipe({
        index: this.id,
        recipe: this.recipeForm.value
      }));
    } else {
      // Due to we use the same names as the model in the form, we can simply pass the
      // the value of the form!
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  get formIngredientsData(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  onAddIngredient() {
    this.formIngredientsData.push(new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'amount': new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onCancel() {
    this.recipeForm.reset();
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    this.formIngredientsData.removeAt(index);
  }
}
