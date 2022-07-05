import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule  } from '@angular/router';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

const routes:Routes = [
  {path: 'header', component: HeaderComponent},
  {path: 'menu', component: MenuComponent}
];

@NgModule({
  declarations: [
    SharedComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
