import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';


@NgModule({
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
