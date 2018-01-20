import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() {
  }

  signupUser(email: string, passw: string) {
    console.log(email, passw);
    firebase.auth().createUserWithEmailAndPassword(
      email, passw
    ).catch(error => console.log(error));
  }

  signInUser(email: string, passw: string) {
    firebase.auth().signInWithEmailAndPassword(email, passw)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

}
