import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from '../core/_helpers/auth.interceptor';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AddJobreqComponent } from './home/components/add-jobreq/add-jobreq.component';
import { JobreqDetailsComponent } from './home/components/jobreq-details/jobreq-details.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'addjobreq', component: AddJobreqComponent },
  { path: 'jobreqdetails/:id', component: JobreqDetailsComponent },
];

@NgModule({
  declarations: [
    FeaturesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddJobreqComponent,
    JobreqDetailsComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [authInterceptorProviders],
  bootstrap: [FeaturesComponent]
})
export class FeaturesModule { }
