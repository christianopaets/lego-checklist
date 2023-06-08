import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'themes/:id/sets',
    loadChildren: () => import('./modules/sets/sets.module').then(m => m.SetsModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'themes/1/sets'
  },
  {path: 'themes', loadChildren: () => import('./modules/themes/themes.module').then(m => m.ThemesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
