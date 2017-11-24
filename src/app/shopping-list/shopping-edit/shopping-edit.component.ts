import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: [ './shopping-edit.component.css' ],
  encapsulation: ViewEncapsulation.Emulated
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() {
  }

  ngOnInit() {
  }

  onAddItem(event) {
    event.preventDefault();
    if (!this.nameInput.nativeElement.value.trim() || !this.amountInput.nativeElement.value.trim()) {
      return;
    }
    this.ingredientAdded.emit(
      new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value)
    );
  }

}
