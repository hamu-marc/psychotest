import {PsychoApi} from '../components/psychoapi';
import {inject} from 'aurelia-framework';
import {saveAs} from 'file-saver';
import XLSX from 'xlsx';
import { observable } from 'aurelia-framework';

@inject(PsychoApi)
export class Results {
  @observable selectAll = false;
  constructor(api) {
    this.api = api;
    this.showdetail = false;
    this.noresults = false;
    this.merging = false;
    //this.selectAll = false;
  }

  activate(params, routeConfig) {
    console.log('Dashboard.activate()');
    this.noresults = !this.api.cachedtests;
    if (this.api.dashboardstr && this.api.cachedtests) {
      this.tests = this.api.cachedtests.filter(item2 => (item2.name.endsWith('.presult')));
      this.noresults = this.tests.length === 0;
      for (let test of this.tests) {
        let csvfile = test.name + '.csv';
        let csvfile2 = test.name.replace('.presult', '.csv');
        let csvfileitem = this.api.cachedtests.find(x => (x.name === csvfile || x.name === csvfile2));
        if (csvfileitem) test.csvfileitem = csvfileitem;
      }
      this.virtualfolder = this.api.dashboardstr.virtualfolder;
      this.currentfolder = this.api.dashboardstr.currentfolder;
      this.currentsource = this.api.dashboardstr.currentsource;
      this.wasInitialized = this.api.dashboardstr.wasInitialized;
      this.isRoot = this.api.dashboardstr.isRoot;
    }
    //console.log('activated testdefinition:', this.api.testdefinition);
    //this.testid = params.id;
    //this.testsource = params.source;
    //this.testpath = params.path;
    //this.testdefinition = params.testdef;
    //console.log('activated with params', params.id, params.source, params.path, params.testdef);
    //read test definition if all params are defined
    if (params.id && params.source) {
      this.testid = params.id;
      this.testsource = params.source;
      this.testpath = params.path;
      this.testdefinition = params.testdef;
      this.api.initLocalStorage()
        .then(() =>{
          this.api.getTestDefinition(this.testid, this.testsource, this.testpath)
            .then(data =>{
              this.editor.setValue(data);
              this.baseurl = this.api.getStimuliBaseUrl(this.testid, this.testsource, this.testpath);
              this.okmessage = 'Nahrán soubor ' + this.testid;
            })
            .catch(error=>{
              //if it does not exist - expect the first line of testdef sent in params
              if (this.testdefinition) {
                this.editor.setValue(this.testdefinition);
                this.baseurl = this.api.getStimuliBaseUrl(this.testid, this.testsource, this.testpath);
                this.api.putTestDefinition(this.testid, this.testsource, this.testpath, this.testdefinition)
                  .then(x=>{
                    console.log('put result:', x);
                    this.logok('Vytvořen soubor ' + this.testid + '.');
                  })
                  .catch(e=>{
                    console.log('put result:', e);
                    this.logerror('Chyba při vytváření souboru ' + this.testid + ' v datovém uložišti ' + this.testsource + '.');
                  });
              } else {
                console.log('error', error);
                //alert('Error retrieving test id:' + this.testid + ' from source:' + this.testsource + ' path:' + this.testpath);
                this.logerror('Chyba při otvírání/vytváření souboru ' + this.testid);
              }
            });
        });
    }
    //sort results
    this.sortByDate();
  }

  attached() {
    this.data = [
      ['testname', 'testuser', 'case', 'question', 'answer', 'date', 'note']
    ];
  }

  openresult(item) {
    this.showdetail = true;
    //item.id
    //read the json file
    this.testid = item._id;
    //console.log('results.openresult() item,', item);
    this.api.getTestDefinition(item._id, this.currentsource, this.currentfolder)
      .then(data => {
        let arraydata = this.api.parseResultData(JSON.parse(data));
        this.data = arraydata;

        //create csv, save csv into the same location, view this csv in some table structure
        /*if (!item.csvfileitem) {
          this.generateAndSaveCSV(item);
          //console.log('results item', item);
        }*/
      });
  }

  generateAndSaveCSV(item) {
    //if no item specified - then generate for current testid
    if (!item) {item = {_id: this.testid};}
    let content = this.api.generateCSV2(this.data);
    let filename = item._id.replace('.presult', '.csv');

    let blob = new Blob([content], {type: 'text/csv;charset=utf-8;'});
    saveAs(blob, filename);
  }

  download() {
    this.api.saveAsCSV(this.data);
  }

  //this reads all CSV files - do not generate new one
  async mergeResultCSV() {
    if (!this.merging) {
      this.merging = true;
      //this.testid
      //1.extract prefix
      let prefix = this.testid.slice(0, this.testid.indexOf('.ptest')) + '.ptest';
      let filename = this.testid.slice(0, this.testid.indexOf('.ptest')) + '.merged.csv';
      //2.find all files with prefix
      //console.log('mergeResultCSV() resultfiles', resultfiles);
      let resultfiles = this.api.cachedtests.filter(x => x._id.startsWith(prefix));
      console.log('mergeResultCSV() prefix,tests,resultfiles', prefix, this.tests, resultfiles);
      //3.read content of the files and merge them
      let content = '"sep=,"\n';
      let csvcontent = '';
      let csvindex = 0;
      for (let resultf of resultfiles) {
        if (resultf.name.endsWith('.csv')) {
          csvindex++;
          //only read csv
          csvcontent = await this.api.getTestDefinition(resultf.name, this.currentsource, this.currentfolder);
          //remove first and second line for csv in sequence >1
          if (csvindex > 1) csvcontent = csvcontent.split('\n').filter((l, i)=> i > 1).join('\n');
          //replace first empty column by an index - in the user column using multiline global regex
          content += csvcontent.replace(/^,,/mg, ',' + csvindex + ',');
          //console.log('mergeResultCSV add', resultf.name);
        }
      }
      //4.write merged csv content to server OR download locally ??
      //        await this.api.putTestDefinition(filename, this.currentsource, this.currentfolder, content);

      let filename2 = prompt('File name (*.csv):', 'mergedresults.csv');
      let blob = new Blob([content], {type: 'text/csv;charset=utf-8;'});
      saveAs(blob, filename2);
      this.merging = false;
    }
  }

  /**
   * Generates CSV from result data
   * @param data
   * @returns {string}
   */
  generateAndSaveExcel(item) {
    //if no item specified - then generate for current testid
    if (!item) {item = {_id: this.testid};}
    let filename = item._id.replace('.presult', '.xlsx');
    let wb = XLSX.utils.book_new(); let ws = XLSX.utils.aoa_to_sheet(this.data);
    console.log(this.data);
    /* add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, 'test_results');
    XLSX.writeFile(wb, filename);
  }

  generateAndSaveOds(item) {
    //if no item specified - then generate for current testid
    if (!item) {item = {_id: this.testid};}
    let filename = item._id.replace('.presult', '.ods');
    let wb = XLSX.utils.book_new(); let ws = XLSX.utils.aoa_to_sheet(this.data);
    console.log(this.data);
    /* add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, 'test_results');
    XLSX.writeFile(wb, filename);
  }

  selectAllResults(newvalue) {
    if (newvalue) {
      //selectAll true
      for (let result of this.tests) {result.selected = true;}
    } else {
      //selectAll false
      for (let result of this.tests) {result.selected = false;}
    }
  }

  checkUncheck(result) {
    if (result.selected) result.selected = false;
    else result.selected = true;
  }

  //this reads all CSV files - do not generate new one
  async mergeResults(items) {
    //this.testid
    //let filename = this.testid.slice(0, this.testid.indexOf('.ptest')) + '.merged.csv';
    //2.find all files with prefix
    //console.log('mergeResultCSV() resultfiles', resultfiles);
    //let resultfiles = this.api.cachedtests.filter(x => x._id.startsWith(prefix));
    //console.log('mergeResultCSV() prefix,tests,resultfiles', prefix, this.tests, resultfiles);
    //3.read content of the files and merge them
    //let content = '"sep=,"\n';
    //let csvcontent = '';
    let csvindex = 0;
    let mergedresults = [];
    for (let item of items) {
      if (item.name.endsWith('.presult')) {
        csvindex++;
        //only read csv
        let content = await this.api.getTestDefinition(item.name, this.currentsource, this.currentfolder);
        //remove first and second line for csv in sequence >1
        //if (csvindex > 1) csvcontent = csvcontent.split('\n').filter((l, i)=> i > 1).join('\n');
        //replace first empty column by an index - in the user column using multiline global regex
        let result = this.api.parseResultData(JSON.parse(content));
        if (csvindex > 1) result.shift();
        mergedresults.push(...result);
        //content += csvcontent.replace(/^,,/mg, ',' + csvindex + ',');
        //console.log('mergeResultCSV add', resultf.name);
      }
    }
    return mergedresults;
    //4.write merged csv content to server OR download locally ??
    //        await this.api.putTestDefinition(filename, this.currentsource, this.currentfolder, content);
  }

  async mergeCSV() {
    if (!this.merging) {
      this.merging = true;
      let {prefix, items} = this.determinePrefixResults();
      if (!this.merging) return;
      let filename2 = prompt('File name (*.csv):', prefix + '.mergedresults.csv');
      if (filename2) {
        if (!filename2.endsWith('.csv')) filename2 += '.csv';
        console.log('results merge csv items:', items);
        let content = await this.mergeResults(items);
        let cvscontent = this.api.generateCSV2(content);
        let blob = new Blob([cvscontent], {type: 'text/csv;charset=utf-8;'});
        saveAs(blob, filename2);
      }
      this.merging = false;
    }
  }

  async mergeExcel() {
    if (!this.merging) {
      this.merging = true;
      let {prefix, items} = this.determinePrefixResults();
      if (!this.merging) return;
      let filename2 = prompt('File name (*.xlsx):', prefix + '.mergedresults.xlsx');
      if (filename2) {
        if (!filename2.endsWith('.xlsx')) filename2 += '.xlsx';
        //let items = this.tests.filter(x => x.selected);
        let content = await this.mergeResults(items);
        let wb = XLSX.utils.book_new(); let ws = XLSX.utils.aoa_to_sheet(content);
        /* add worksheet to workbook */
        XLSX.utils.book_append_sheet(wb, ws, 'test_results');
        XLSX.writeFile(wb, filename2);
      }
      this.merging = false;
    }
  }

  //returns prefix and items based on selected or existing results with same prefix
  determinePrefixResults() {
    let prefix;
    //filter selected
    let items = this.tests.filter(x => x.selected);
    //if no or 1 selected - select items based on prefix
    if (!items || items.length < 2) {
      //prefix is the selected
      if (items && items.length === 1) prefix = items[0].name.slice(0, items[0].name.indexOf('.ptest')) + '.ptest';
      //or the currently viewed test results
      else {
        if (!this.testid) {
          this.merging = false;
          alert('Vyberte nebo otevřete výsledek testu. Poté lze slučovat.');
          return {prefix, items};
        }
        prefix = this.testid.slice(1, this.testid.indexOf('.ptest')) + '.ptest';
      }
      //filter by prefix
      items = this.api.cachedtests.filter(x => x.name.startsWith(prefix) && x.name.endsWith('.presult'));
      if (!confirm('sloučit výsledky ' + items.length + ' testů začínající na ' + prefix)) {
        //console.log('items', items);
        this.merging = false;
      }
    } else prefix = items[0].name.slice(0, items[0].name.indexOf('.ptest')) + '.ptest';
    return {prefix, items};
  }

  async mergeODS() {
    if (!this.merging) {
      this.merging = true;
      let {prefix, items} = this.determinePrefixResults();
      if (!this.merging) return;
      let filename2 = prompt('File name (*.ods):', prefix + '.mergedresults.ods');
      if (filename2) {
        if (!filename2.endsWith('.ods')) filename2 += '.ods';
        //let items = this.tests.filter(x => x.selected);
        let content = await this.mergeResults(items);
        //console.log('mergeODS() content', content);
        let wb = XLSX.utils.book_new(); let ws = XLSX.utils.aoa_to_sheet(content);
        /* add worksheet to workbook */
        XLSX.utils.book_append_sheet(wb, ws, 'test_results');
        XLSX.writeFile(wb, filename2);
      }
      this.merging = false;
    }
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
