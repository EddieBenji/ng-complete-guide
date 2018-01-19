import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyCenY1yE-A1yipuCrP1rm103i86jXWiLYA',
      authDomain: 'lalo-ng-recipe-book.firebaseapp.com',
    });
  }
}
