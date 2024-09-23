import '@babel/polyfill';
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';
import * as Bluebird from 'bluebird';

import {I18N, TCustomAttribute} from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import resBundle from 'i18next-resource-store-loader!./locales/index.js';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('aurelia-dynamic-html'))
    .plugin(PLATFORM.moduleName('aurelia-animator-css'))
    .plugin(PLATFORM.moduleName('aurelia-event-aggregator'))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), (instance) => {
      let aliases = ['t', 'i18n'];
      TCustomAttribute.configureAliases(aliases);
      instance.i18next.use(Backend)
        .use(LanguageDetector);
      return instance.setup({
        resources: resBundle, //<-- configure aurelia-i18n to use your bundled translations
        backend: {
          loadPath: 'locales/{{lng}}/{{ns}}.json'
        },
        attributes: aliases,
        //lng: 'cs',
        fallbackLng: 'en',
        debug: true,
        skipTranslationOnMissingKey: true
      });
    });

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }
  PLATFORM.moduleName('maineditor.js');
  PLATFORM.moduleName('mainresult.js');
  return aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('components/test')));
}
