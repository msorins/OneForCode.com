import { NgModule, ModuleWithProviders } from '@angular/core';

import { ProjectsService } from './projects/index';
import { ReposService } from './repos/index';
import { NotificationsService } from "./notifications/index";
import { PaymentsService } from "./payments/payments.service";

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
        providers: [ProjectsService, ReposService, NotificationsService, PaymentsService]
      };
    }

}
