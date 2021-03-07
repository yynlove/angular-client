import { ModuleWithProviders} from '@angular/core';
import { CookieStorageStore, DA_STORE_TOKEN } from '@delon/auth';

export class GlobalConfigModule {
  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [
        { provide: DA_STORE_TOKEN, useClass: CookieStorageStore }
      ]
    };
  }
}
