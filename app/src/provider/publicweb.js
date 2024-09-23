import {Provider} from './provider';

export class Publicweb extends Provider {
  constructor(opts) {
    super(opts);
    this.baseurl = 'https://psychoacoustic.hamu.cz/';
  }

  getBaseUrl(resource) {
    return super.getBaseUrl(resource);
  }

  getHeaders() {
    return super.getHeaders();
  }
}
