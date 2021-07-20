import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeModule } from '../pages/home/home.module';
const routes: Routes = [
  {
    path: '',
    loadChildren: '../pages/home/home.module#HomeModule',
    canActivate: [],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
