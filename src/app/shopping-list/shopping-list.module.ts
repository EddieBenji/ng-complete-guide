import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShoppingListRoutingModule
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ]
})
export class ShoppingListModule {
}
