import { GCloudStorageOptions, GCLOUD_STORAGE_MODULE_OPTIONS } from '.';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { MultiGCloudStorageService } from './multi-gcloud-storage.service';

@Global()
@Module({
  providers: [MultiGCloudStorageService],
  exports: [MultiGCloudStorageService],
})
export class MultiGCloudStorageModule {
  static withConfig(options: GCloudStorageOptions[]): DynamicModule {
    const gcsModuleOptions = {
      provide: GCLOUD_STORAGE_MODULE_OPTIONS,
      useValue: options,
    };

    const gcsServiceProvider = {
      provide: MultiGCloudStorageService,
      useFactory: (options: GCloudStorageOptions[]) => new MultiGCloudStorageService(options),
      inject: [GCLOUD_STORAGE_MODULE_OPTIONS],
    };

    return {
      module: MultiGCloudStorageModule,
      providers: [gcsModuleOptions, gcsServiceProvider],
      exports: [MultiGCloudStorageService],
    };
  }
}
