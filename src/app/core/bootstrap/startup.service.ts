import { Injectable } from '@angular/core';
import { AuthService, User } from '@core/authentication';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Menu, MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  user: any;
  currentRole = '';
  currentPermissions!: string[];
  permissionsOfRole: any = {
    ADMIN: ['canAdd', 'canDelete', 'canEdit', 'canRead'],
    MANAGER: ['canAdd', 'canEdit', 'canRead'],
    GUEST: ['canRead'],
  };
  private readonly _destroy$ = new Subject<void>();
  constructor(
    private authService: AuthService,
    private menuService: MenuService,
    private permissionsSrv: NgxPermissionsService,
    private rolesSrv: NgxRolesService
  ) {}

  /**
   * Load the application only after get the menu or other essential informations
   * such as permissions and roles.
   */
  load() {
    return new Promise<void>((resolve, reject) => {
      this.authService
        .change()
        .pipe(
          tap(user => this.setPermissions(user)),
          tap(user => (this.user = user)),
          switchMap(() => this.authService.menu()),
          tap(menu => this.setMenu(menu))
        )
        .subscribe(
          () => resolve(this.onPermissionChange()),
          () => resolve()
        );
    });
  }

  private setMenu(menu: Menu[]) {
    this.menuService.addNamespace(menu, 'menu');
    this.menuService.set(menu);
  }

  private setPermissions(user: User) {
    // In a real app, you should get permissions and roles from the user information.
    const permissionsAdmin = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    const permissionsManager = ['canAdd', 'canEdit', 'canRead'];
    const permissionsGuest = ['canRead'];
    this.permissionsSrv.loadPermissions(permissionsManager);
    this.rolesSrv.flushRoles();
    this.rolesSrv.addRoles({
      ADMIN: permissionsAdmin,
      MANAGER: permissionsManager,
      GUEST: permissionsGuest,
    });
    /* // In a real app, you should get permissions and roles from the user information.
    const permissions = ['canAdd', 'canDelete', 'canEdit', 'canRead'];
    this.permissonsService.loadPermissions(permissions);
    this.rolesService.flushRoles();
    this.rolesService.addRoles({ ADMIN: permissions });

    // Tips: Alternatively you can add permissions with role at the same time.
    // this.rolesService.addRolesWithPermissions({ ADMIN: permissions }); */
  }

  onPermissionChange() {
    console.log('user:  ', this.user);

    if (this.user && this.user.role === 'Administrator') {
      this.currentRole = 'ADMIN';
      console.log('Es admin');
    } else if (this.user && this.user.role === 'Manager') {
      this.currentRole = 'MANAGER';
      console.log('Es manager');
    } else if (this.user && this.user.role === 'Guest') {
      this.currentRole = 'GUEST';
      console.log('Es guest');
    }

    this.currentPermissions = this.permissionsOfRole[this.currentRole];
    this.rolesSrv.flushRolesAndPermissions();
    this.rolesSrv.addRoleWithPermissions(this.currentRole, this.currentPermissions);
  }
}
