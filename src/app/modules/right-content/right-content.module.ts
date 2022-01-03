import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RightContentRoutingModule } from './right-content-routing.module';
import { RightButtonComponent } from '../components/right-button/right-button.component';


@NgModule({
  declarations: [
    RightButtonComponent
  ],
  imports: [
    CommonModule,
    RightContentRoutingModule
  ],
  exports: [RightButtonComponent]
})
export class RightContentModule { }
