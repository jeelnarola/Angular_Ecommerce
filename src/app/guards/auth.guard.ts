import { UserService } from './../Services/User/user.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state): boolean  => {
  const router: Router = inject(Router);
  const userService: UserService = inject(UserService);

  if (!userService.isLoggIn()) {
    router.navigate(['signup']);
    return false;
  } else {
    return true;
  }
};