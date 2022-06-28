import { GCloudStorageOptions, GCloudStorageService } from '.';

export class MultiGCloudStorageService {
  private readonly cloudStorageServices: GCloudStorageService[] = [];
  constructor(private readonly options: GCloudStorageOptions[]) {
    this.options.forEach((option) => this.cloudStorageServices.push(new GCloudStorageService(option)));
  }

  get(idx: any): GCloudStorageService {
    return this.cloudStorageServices[idx];
  }

  forEach(callbackfn: (value) => void): void {
    this.cloudStorageServices.forEach((value: GCloudStorageService) => callbackfn(value));
  }
}
