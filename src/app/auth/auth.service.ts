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

  signupUser(email: string, passw: string) {
    firebase.auth().createUserWithEmailAndPassword(
      email, passw
    ).then(
      user => {
        this.store.dispatch(new AuthActions.SignUp());
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
        );
      }
    )
      .catch(error => console.log(error));
  }

  signInUser(email: string, passw: string) {
    firebase.auth().signInWithEmailAndPassword(email, passw)
      .then(response => {
        this.store.dispatch(new AuthActions.SignIn());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.store.dispatch(new AuthActions.SetToken(token))
        );
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }

}
