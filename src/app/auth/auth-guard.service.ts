import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

import * as fromApp from '../ngrx-store/app.reducers';
import * as fromAuth from './ngrx-store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.AuthState) => {
        if (authState) {
          return authState.authenticated;
        }
        return false;
      });
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isAuthenticated();
    // For now, because we are changing everything to ngrx
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.AuthState) => {
        return authState && authState.authenticated;
      });
    // return true;
  }
}
