import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((indexOfIngredient: number) => {
      this.editMode = true;
      this.editedItemIndex = indexOfIngredient;
      this.editedItem = this.shoppingListService.getIngredient(indexOfIngredient);
      this.slForm.setValue({
        'name': this.editedItem.name,
        'amount': this.editedItem.amount
      });
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    if (!form.value.name.trim() || !form.value.amount) {
      return;
    }
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(ingredient);
    } else {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    }
    this.onClearForm();
  }

  onClearForm() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }

}
