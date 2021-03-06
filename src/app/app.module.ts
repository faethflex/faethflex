import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EngineComponent } from './components/engine/engine.component';
import { FaethFooterComponent } from './components/faeth-footer/faeth-footer.component';
import { FaethHeaderComponent } from './components/faeth-header/faeth-header.component';
import { FaethLeftAsideComponent } from './components/faeth-leftaside/faeth-leftaside.component';
import { FaethRightAsideComponent } from './components/faeth-rightaside/faeth-rightaside.component';
import { AppRoutingModule } from './app-routing.module';
import { RightContentModule } from './modules/right-content/right-content.module';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    FaethFooterComponent,
    FaethHeaderComponent,
    FaethLeftAsideComponent,
    FaethRightAsideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RightContentModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
