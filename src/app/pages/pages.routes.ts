import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';





const pagesRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'} },
  { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas'} },
  { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
  { path: 'account-settings', component: AccoutSettingsComponent, data: {titulo: 'Opciones'} },
  { path: 'profile', component: ProfileComponent, data: {titulo: 'Mi perfil'} },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Busqueda Inteligente'} },
    // Mantenimiento
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: {titulo: 'Mantenimiento usuario'}},
  { path: 'medicos', component: MedicosComponent, canActivate: [AdminGuard], data: {titulo: 'Mantenimiento médicos'} },
  { path: 'medico/:id', component: MedicoComponent, canActivate: [AdminGuard], data: {titulo: 'Actualizar medico'} },
  { path: 'hospitales', component: HospitalesComponent, canActivate: [AdminGuard], data: {titulo: 'Mantenimihospitales'} },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
