/**
 * Created by so on 14/03/2017.
 */
import {NgModule, ModuleWithProviders} from '@angular/core';
import {TimeService} from "./time-difference/index";

@NgModule({
  imports: [],
  declarations: [],
  exports: []
})

export class ToolsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToolsModule,
      providers: [TimeService]
    };
  }
}
