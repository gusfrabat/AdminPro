import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medico/medico.component';





const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'} },
            { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
            { path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Opciones'} },
            { path: 'profile', component: ProfileComponent, data: {titulo: 'Mi perfil'} },
            // Mantenimiento
            { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento usuario'} },
            { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento médicos'} },
            { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar medico'} },
            { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento hospitales'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
