import { NgModule, ModuleWithProviders } from '@angular/core';

import {ProjectsService} from './projects/index'

@NgModule({
  declarations: [

  ],
  imports: [

  ],
  providers: [

  ],
  exports: [

  ]
})

export class ApiModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: ApiModule,
        providers: [ProjectsService]
      };
    }

}
