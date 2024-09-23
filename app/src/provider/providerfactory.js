import {Pcloudpub} from './pcloudpub';
import {Owncloudcesnet} from './owncloudcesnet';
import {Publicweb} from './publicweb';
import { B2drop } from './b2drop';

// Use ES6 Object Literal Property Value Shorthand to maintain a map
// where the keys share the same names as the classes themselves
const classes = {
  Pcloudpub,
  Owncloudcesnet,
  Publicweb,
  B2drop
/*  Pcloudpub: Pcloudpub,
  Owncloudcesnet: Owncloudcesnet,
  Publicweb: Publicweb*/
};

export class ProviderFactory {
  constructor(className, opts) {
    //console.log('Provider Factory constructor() className,opts,this:', className, opts, classes);
    return new classes[className](opts);
  }
}

