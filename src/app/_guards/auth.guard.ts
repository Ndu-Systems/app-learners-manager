import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../_services';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.accountService.currentUserValue;
    if (currentUser && currentUser.Email) {
      return true;
    } else {
      this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
