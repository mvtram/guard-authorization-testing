
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component, ErrorHandler } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { Role } from './_models/role';
import { RegisterComponent } from './register/register.component';
import { PublisherComponent } from './publisher/publisher.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AdminGuard } from './_guards/admin.guard';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'

  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },

  {
    path: 'publisher',
    component: PublisherComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },

  {
    path: 'not-found',
    loadChildren: './not-found/not-found.module#NotFoundModule'
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
