import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SetsComponent} from './sets.component';

const routes: Routes = [{path: '', component: SetsComponent}, {
  path: ':id',
  loadChildren: () => import('./modules/set/set.module').then(m => m.SetModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetsRoutingModule {
}
