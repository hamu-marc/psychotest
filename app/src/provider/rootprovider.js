export class Rootprovider {
  constructor() {

  }
  attached() {
    this.root();
  }

  root() {
    let providers = this.pa.getProviders();
    this.dirs = [];
    this.files = [];
    for (let provider of providers) {
      let item = {};
      item.name = provider.alias;
      item.nicename = provider.alias;
      item.nicesize = 'DIR (' + provider.type + ')';
      item.nicedate = '';
      item.isdir = true;
      item.isprovider = true;
      /*let prefix = provider.endpoint.slice(0, 8);
      let username = provider.username.replace('@', '%40');
      let suffix = provider.endpoint.slice(8);
      item.url = prefix + username + ':' + provider.usersecure + '@' + suffix;*/
      item.url = provider.endpoint;
      item.auth = btoa(provider.username + ':' + provider.usersecure);
      this.files.push(item);
    }
  }
}
