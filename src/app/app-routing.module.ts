import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EngineComponent } from './components/engine/engine.component';
import { FaethRightAsideComponent } from './components/faeth-rightaside/faeth-rightaside.component';

const routes: Routes = [
  {
    path: 'engine', component: EngineComponent, outlet: 'main-content'
  },
  {
    path: '', loadChildren: () => import('./modules/right-content/right-content.module').then(mod => mod.RightContentModule),
    outlet: 'right-content'
  },
  {
    path: '', component: EngineComponent
  },
  { path: '', redirectTo: 'engine', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
