import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { ProfileComponent } from '../../profile/profile.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { ProfileListComponent } from 'app/profile/list/profile-list.component';
import { UserListComponent } from 'app/user/list/user-list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'user/:id',           component: UserComponent },
    { path: 'users',           component: UserListComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'perfil',     component: ProfileComponent },
    { path: 'perfil/:id',     component: ProfileComponent },
    { path: 'perfis',         component: ProfileListComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
