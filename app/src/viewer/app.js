import {PLATFORM} from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Psychoacoustic Test Viewer Router';
    config.map([
      {route: ['', 'dashboard'], name: 'dashboard', moduleId: PLATFORM.moduleName('viewer/dashboard'), nav: true, title: 'Psychotest - Výběr testu'},
      {route: ['performtest/*encid', 'performtest/mode/:showmode/*encid'], name: 'performtest', moduleId: PLATFORM.moduleName('viewer/performtest'), nav: false, title: 'Psychotest - test'},
      {route: ['directtest/*encid', 'directtest/mode/:showmode/*encid'], name: 'directtest', moduleId: PLATFORM.moduleName('viewer/directtest'), nav: false, title: 'Psychotest - test'},
      {route: ['resumetest/:resumeid'], name: 'resumetest', moduleId: PLATFORM.moduleName('viewer/performtest'), nav: false, title: 'Psychotest - obnova testu'},
      {route: ['finalize', 'finalize/:id'], name: 'finalize', moduleId: PLATFORM.moduleName('viewer/finalize'), nav: false, title: 'Psychotest - závěr testu'},
      {route: 'pausedtest/:resumeid', name: 'pausedtest', moduleId: PLATFORM.moduleName('viewer/pausedtest'), nav: false, title: 'Psychotest - zastavení testu'}
    ]);
    this.router = router;
  }
}
