import {PLATFORM} from 'aurelia-pal';
import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';

@inject(PsychoApi)
export class App {
  constructor(api) {
    this.api = api;
  }

  attached() {
    //console.log('app attached');
  }

  detached() {
    //console.log('app detached');
  }

  configureRouter(config, router) {
    this.router = router;
    this.api.router = router;
    config.title = 'Psychoacoustic Test Viewer Router';
    config.map([
      {
        route: ['', 'dashboard'],
        name: 'dashboard',
        moduleId: PLATFORM.moduleName('editor/dashboard'),
        nav: true,
        title: 'dashboard-select-test',
        settings: {icon: 'fa fa-list-ol'}
      },
      {
        route: ['edittest', 'edittest/:id', 'edittest/:id/:source/*path'],
        name: 'edittest',
        moduleId: PLATFORM.moduleName('editor/edittest'),
        nav: true,
        title: 'edit-test',
        settings: {icon: 'fa fa-edit'}

      },      
      {
        route: 'stimuli',
        name: 'stimuli',
        moduleId: PLATFORM.moduleName('editor/stimuli'),
        nav: true,
        title: 'stimuli',
        settings: {icon: 'fa fa-file-sound-o'}
      },
      {
        route: 'results',
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
        title: 'settings.title',
        settings: {icon: 'fa fa-cog'}
      },
      {
        route: 'account',
        name: 'account',
        moduleId: PLATFORM.moduleName('editor/account'),
        nav: true,
        title: 'account',
        settings: {icon: 'fa fa-male'}
      },
      {
        route: ['performtest/:id', 'performtest/:id/*source'],
        name: 'performtest',
        moduleId: PLATFORM.moduleName('viewer/performtest'),
        nav: false,
        title: 'Perform Test'
      }
    ]);
  }
}
