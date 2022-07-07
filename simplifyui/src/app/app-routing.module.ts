import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'core', loadChildren: () => import('./core/core.module').then(m => m.CoreModule) },
  { path: 'features', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }