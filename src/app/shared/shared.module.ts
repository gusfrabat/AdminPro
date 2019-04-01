import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    PipesModule
  ],
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,

  ],
  exports: [
    PageNotFoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
  ]
})
export class SharedModule { }
