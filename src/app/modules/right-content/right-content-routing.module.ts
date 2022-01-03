import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RightButtonComponent } from '../components/right-button/right-button.component';

const routes: Routes = [
  {
    path: '', component: RightButtonComponent,
    children: [
      // controls
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RightContentRoutingModule { }
