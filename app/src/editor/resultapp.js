import {PLATFORM} from 'aurelia-pal';
import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';

@inject(PsychoApi)
export class Resultapp {

  constructor(api) {
    this.api = api;
  }

  attached() {
    console.log('app attached');
    this.api.getUserInfo()
      .then(userinfo => {
        console.log('userinfo obtained:', userinfo);
      });
  }

  detached() {
    console.log('app detached');
  }

  configureRouter(config, router) {
    config.title = 'Psychoacoustic Test Viewer Router';
    config.map([
      {
        route: ['','results'],
        name: 'results',
        moduleId: PLATFORM.moduleName('editor/results'),
        nav: true,
        title: 'results',
        settings: {icon: 'fa fa-bar-chart'}
      },
      {
        route: 'help',
        name: 'help',
        moduleId: PLATFORM.moduleName('editor/help'),
        nav: true,
        title: 'help',
        settings: {icon: 'fa fa-question-circle-o'}
      },
      {
        route: 'settings',
        name: 'settings',
        moduleId: PLATFORM.moduleName('editor/settings'),
        nav: true,
        title: 'settings',
        settings: {icon: 'fa fa-cog'}
      },
      {
        route: 'account',
        name: 'account',
        moduleId: PLATFORM.moduleName('editor/account'),
        nav: true,
        title: 'account',
        settings: {icon: 'fa fa-male'}
      }
    ]);
    this.router = router;
  }
}

