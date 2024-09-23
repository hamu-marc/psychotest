import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';

@inject(PsychoApi)

export  class Dashboard {
  constructor(api) {
    this.api = api;
    this.tests = [];
    this.statictests = [];
    this.projects = [];
    this.mode = 'tests';
    this.virtualfolder = [];
    this.currentfolder = '';
    this.isloading = false;
    this.isRoot = true;
    //console.log('dashboard() constructor');
    this.wasInitialized = false;
  }

  async attached() {
    //console.log('Dashboard.attached()');
    //if (!this.wasInitialized) {
      //this.wasInitialized = true;
      if (this.virtualfolder.length === 0){
        this.isloading = true;
        await this.api.initFireStore();
        this.isloading = false;
        this.rootdir();
      }
      //localstorage is initialized if not logged
      /*this.api.initLocalStorage()
        .then(x => {
          this.isloading = false;
          this.rootdir();
        })
        .catch(e => {
          this.isloading = false;
          alert('Error: ' + e.toString());
        });*/
    //}
  }

  activate() {
    //console.log('Dashboard.activate()');
    if (this.api.dashboardstr) {
      this.tests = this.api.dashboardstr.tests;
      this.virtualfolder = this.api.dashboardstr.virtualfolder;
      this.currentfolder = this.api.dashboardstr.currentfolder;
      this.currentsource = this.api.dashboardstr.currentsource;
      this.wasInitialized = this.api.dashboardstr.wasInitialized;
      this.isRoot = this.api.dashboardstr.isRoot;
      if (this.isRoot) { this.rootdir(); this.numberresults = 0; } else
      if (this.api.cachedtests) this.numberresults = this.api.cachedtests.filter(x => x.name.endsWith('.presult')).length;
    }
  }

  deactivate() {
    this.api.dashboardstr = {
      tests: this.tests,
      virtualfolder: [...this.virtualfolder],
      currentfolder: this.currentfolder,
      currentsource: this.currentsource,
      wasInitialized: this.wasInitialized,
      isRoot: this.isRoot};
  }

  /**
   * convert api.remote structure to tests file/directory structure
   */
  rootdir() {
    this.tests = [];
    //console.log('dashboard rootdir()');
    if (this.api.remote) {
      for (const [key, remote] of this.api.remote.entries()) {
        this.tests.push({
          isdir: true,
          name: key,
          snippet: remote.type,
          _id: key,
          _updated: 'DIR',
          source: ''
        });
      }
    }
  }

  firstupdir() {
    this.tests = [];
    this.tests.push({
      isdir: true,
      name: '..',
      snippet: '',
      _id: '..',
      _updated: '',
      source: '',
      size: 'UP-DIR'
    });
  }

  opendir(item) {
    this.isloading = true;
    if (item.name === '..') {//updir
      let current = this.virtualfolder.pop();
      this.isRoot = this.virtualfolder.length === 0;
      if (!this.isRoot) {
        //take the last folder
        this.currentfolder = this.virtualfolder[this.virtualfolder.length - 1].fullPath;
        this.currentsource = this.virtualfolder[0].name;
        current = this.virtualfolder[this.virtualfolder.length - 1];
        this.firstupdir();
        //read updir
        this.loadDirectoryContent(current);
      } else {
        this.currentfolder = '';
        this.currentsource = '';
        this.rootdir();
        this.isloading = false;
      }
    } else { //downdir
      item.fullPath = this.virtualfolder.length > 0 ? this.virtualfolder[this.virtualfolder.length - 1].fullPath + '/' + item.name : '';
      this.virtualfolder.push(item);
      this.isRoot = this.virtualfolder.length === 0;
      this.currentfolder = (this.virtualfolder.length > 0) ? item.fullPath : '';
      this.currentsource = this.virtualfolder[0].name;
      this.firstupdir();
      //read downdir
      this.loadDirectoryContent(item);
    }
  }

  loadDirectoryContent(item) {
    this.api.getTests(this.virtualfolder[0].name, item.fullPath)
      .then(data => {
        this.firstupdir();
        this.tests.push.apply(this.tests, data.filter(item2 => (item2.name.endsWith('.ptest') || item2.isdir)));
        this.numberresults = data.filter(x => x.name.endsWith('.presult')).length;
        this.api.cachedtests = data;
      })
      .finally(() => {
        this.isloading = false;
        //console.log('dashboard tests:',this.tests)
      });
  }

  async refresh() {
    if (this.virtualfolder.length > 0) {
      this.isloading = true;
      let current = this.virtualfolder[this.virtualfolder.length - 1];
      this.loadDirectoryContent(current);
    } else {
      this.isloading = true;
      await this.api.initFireStore();
      this.isloading = false;
      this.rootdir();

    }
  }

  retrievedata(index) {
    this.isloading = true;
    console.log('retrievedata index,this.api.remote.length', index, this.api.remote.length);
    if (this.api.remote.length > index) {
      this.api.getTests(this.api.remote[index]).then(
        data => {
          //append data to tests array
          this.tests.push.apply(this.tests, data);
          console.log('dashboard attached(), tests retrieved,', this.tests);
          this.retrievedata(index + 1);
        }
      )
        .finally(()=> this.isloading = false);
    }
  }

  openTest(test) {
  }

  copyTest(test) {
  }

  downloadTest(test) {
  }

  archiveTest(test) {
    this.api.delete(test._id, test.source)
      .then(x=>{
        this.tests = this.tests.filter(item => item !== test);
      });
  }

  switchTests() {
    this.mode = 'tests';
    return true;
  }
  switchProjects() {
    this.mode = 'projects';
    return true;
  }

  createTest() {
    this.creatingTest = true;
    this.creatingFolder = false;
  }

  submitNewTest() {
    this.creatingTest = false;
    //TODO implement
    if (this.newtestname && this.newtestname.length > 0) {
      //create test
      //adds extension
      if (!this.newtestname.endsWith('.ptest')) this.newtestname = this.newtestname + '.ptest';
      //make some default definition
      let newtestdef = 'test ' + this.newtestname + ' \n  screen First Screen Description\n';
      //route to editor
      this.api.router.navigateToRoute('edittest', {testdef: newtestdef, id: this.newtestname, source: this.currentsource, path: this.currentfolder});
    }
  }
  cancelNewTest() {
    this.creatingTest = false;
  }

  createFolder() {
    this.creatingFolder = true;
    this.creatingTest = false;
  }

  submitNewFolder() {
    this.creatingFolder = false;
    //TODO implement
    if (this.newfoldername && this.newfoldername.length > 0) {
      //create folder
      //let newtestdef = 'test ' + this.newtestname + ' \n  screen First Screen Description\n';
      //this.api.router.navigateToRoute('edittest', {testdef: newtestdef, id: this.newtestname, source: this.currentsource, path: this.currentfolder});
      //TODO test creating and test whether it is updated in UI list
      this.api.createFolder(this.newfoldername, this.currentsource, this.currentfolder)
        .then(response=>{
          console.log('created new folder');
          this.tests.push({
            isdir: true,
            name: this.newfoldername,
            snippet: '',
            _id: this.newfoldername,
            _updated: '---',
            source: this.currentsource
          });
        });
    }
  }
  cancelNewFolder() {
    this.creatingFolder = false;
  }

  ascending = true;
  sortByDate() {
    this.ascending = !this.ascending;
    //sort this.tests
    let sorted = [];
    //first dirs
    sorted.push.apply(sorted, this.tests.filter(x => x.isdir));
    //then the rest
    let files = [];
    files.push.apply(files, this.tests.filter(x => !x.isdir));
    if (this.ascending) files.sort(function(a, b) {return Date.parse(a._updated) - Date.parse(b._updated);});
    else files.sort(function(b, a) {return Date.parse(a._updated) - Date.parse(b._updated);});
    this.tests = [...sorted, ...files];
    console.log('sorted:',files);
  }
}
