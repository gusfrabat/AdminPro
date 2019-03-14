import { NgModule } from '@angular/core';

import { PagesComponent } from './pages/pages.component';

import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { RegisterComponent } from './login/register.component';

const routes: Routes = [
  {path: '',
   component: PagesComponent,
   children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'progress', component: ProgressComponent},
    {path: 'grafica1', component: Graficas1Component},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
