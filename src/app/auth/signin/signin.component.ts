import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as fromApp from '../../ngrx-store/app.reducers';
import * as AuthActions from '../ngrx-store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    const email = form.value.email;
    const passw = form.value.password;
    this.store.dispatch(new AuthActions.TrySignIn({ username: email, password: passw }));
  }

}
