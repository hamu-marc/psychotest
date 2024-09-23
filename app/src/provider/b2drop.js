import { Owncloudcesnet } from "./owncloudcesnet";

export class B2drop extends Owncloudcesnet {
    constructor(opts) {
        super(opts);
        this.proxyurl = 'https://psychoacoustic-proxycors.herokuapp.com/'; //no-cors proxy microservice
        this.baseurl1 = 'https://b2drop.eudat.eu/public.php/webdav/';
        //this.baseurl1 = 'https://owncloud.cesnet.cz/public.php/webdav/';
        this.baseurl2 = 'https://b2drop.eudat.eu/s/';
        this.baseurl = this.proxyurl + this.baseurl1;
}
}