import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/index';

import { HeaderComponent } from './header/index';
import { PromoComponent } from './promo/index';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, HeaderComponent, PromoComponent],
  exports: [HomeComponent, HeaderComponent, PromoComponent],
  providers: [NameListService]
})
export class HomeModule { }
