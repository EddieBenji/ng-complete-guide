import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule
  ],
  /*
  * The providers array was removed, because the core module already have them all.
  * And because is imported eagerly, the instances are the sames! (this does not happens
  * when you use lazy load on modules).
  * */
  bootstrap: [AppComponent]
})
export class AppModule {
}
