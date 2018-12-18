import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// components
import { LoginComponent } from './login/login.component';

// routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
