import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {
  }

  signupUser(email: string, passw: string) {
    firebase.auth().createUserWithEmailAndPassword(
      email, passw
    ).catch(error => console.log(error));
  }

  signInUser(email: string, passw: string) {
    firebase.auth().signInWithEmailAndPassword(email, passw)
      .then(response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken().then(
          (token: string) => this.token = token
        );
      })
      .catch(error => console.log(error));
  }

  getToken() {
    if (firebase.auth().currentUser) {
      firebase.auth().currentUser.getToken().then(
        (token: string) => this.token = token
      );
    }
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/signin']);
  }

}
