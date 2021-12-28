import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EngineComponent } from './engine/engine.component';
import { EngineDebugComponent } from './components/engine-debug/engine-debug.component';

const routes: Routes = [
  { path: 'debug', component: EngineDebugComponent },
  { path: '', component: EngineComponent }
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
