import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../ngrx-store/app.reducers';
import * as fromAuth from './ngrx-store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromApp.AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth').map((authState: fromAuth.AuthState) => {
      return authState.authenticated;
    });
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    // return this.authService.isAuthenticated();
    // For now, because we are changing everything to ngrx
    return true;
  }
}
