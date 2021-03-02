import { ModuleWithProviders} from '@angular/core';
import { DA_STORE_TOKEN, LocalStorageStore } from '@delon/auth';

export class GlobalConfigModule {
  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [
        { provide: DA_STORE_TOKEN, useClass: LocalStorageStore }
      ]
    };
  }
}