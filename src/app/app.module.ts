import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EngineComponent} from './engine/engine.component';
import {UiInfobarBottomComponent} from './ui/ui-infobar-bottom/ui-infobar-bottom.component';
import {FaethHeaderComponent} from './components/faeth-header/faeth-header.component';
import {UiSidebarLeftComponent} from './ui/ui-sidebar-left/ui-sidebar-left.component';
import {UiSidebarRightComponent} from './ui/ui-sidebar-right/ui-sidebar-right.component';
import {UiComponent} from './ui/ui.component';
import { AppRoutingModule } from './app-routing.module';
import { EngineDebugComponent } from './components/engine-debug/engine-debug.component';

@NgModule({
  declarations: [
    AppComponent,
    EngineComponent,
    UiComponent,
    UiInfobarBottomComponent,
    FaethHeaderComponent,
    UiSidebarLeftComponent,
    UiSidebarRightComponent,
    EngineDebugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
