import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


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
    ModalUploadComponent

  ],
  exports: [
    PageNotFoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcumbsComponent,
    ModalUploadComponent
  ]
})
export class SharedModule { }
