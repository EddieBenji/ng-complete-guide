import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../ngrx-store/app.reducers';
import * as AuthActions from './ngrx-store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }

}
