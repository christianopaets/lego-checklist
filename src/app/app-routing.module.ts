import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'sets',
    loadChildren: () => import('./modules/sets/sets.module').then(m => m.SetsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sets'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
