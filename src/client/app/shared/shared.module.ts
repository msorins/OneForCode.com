import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar/index';
import { NavbarComponent } from './navbar/index';
import { HeaderComponent } from './header/index';
import { FooterComponent } from './footer/index';
import { NameListService } from './name-list/index';
import { AuthModule } from '../auth/auth.module';
import { LoadingAnimationComponent } from './loading-animation/index'
import {PopoverModule} from "ngx-popover";
import {NotificationsComponent} from "./notifications/notifications.component";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, AuthModule, PopoverModule],
  declarations: [ToolbarComponent, NavbarComponent, HeaderComponent, FooterComponent, LoadingAnimationComponent, NotificationsComponent],
  exports: [ToolbarComponent, NavbarComponent, CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent, LoadingAnimationComponent, NotificationsComponent]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [NameListService]
    };
  }
}
