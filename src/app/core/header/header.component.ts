import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromAuth from '../../auth/ngrx-store/auth.reducers';
import * as fromApp from '../../ngrx-store/app.reducers';
import * as AuthActions from '../../auth/ngrx-store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  public authState: Observable<fromAuth.AuthState>;

  constructor(private storageService: DataStorageService,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onStorageData() {
    this.storageService.storeRecipes().subscribe(
      (response: HttpResponse<any>) => console.log(response)
    );
  }

  onFetchData() {
    this.storageService.fetchRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
