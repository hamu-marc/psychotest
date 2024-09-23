import {saveAs} from 'file-saver';
import {inject} from 'aurelia-framework';
import {PsychoApi} from '../components/psychoapi';
import XLSX from "xlsx";

@inject(PsychoApi)
export class Finalize {
  constructor(pa) {
    this.api = pa;
  }

  activate(params) {
    this.testid = params.id;
    this.lastresult = this.api.getLastResult();
    this.checks = 0;
    //initial schedule to check result are stored
    setTimeout(()=>{
      this.checkResultStored();
    }, 3000);
  }

  checkResultStored() {
    //after 3 checks, lon uploading - 3*3= 10 s
    this.checks++;
    this.api.uploadinglong = this.checks > 3;
    //if not stored and not uploading - download explicitly
    if (this.api.uploadinglong || (!this.api.uploading && !this.api.lastResultSaved)) this.downloadResult();
    //if still uploading - then schedule to check again in 3 s.
    else if (this.api.uploading) setTimeout(()=>{this.checkResultStored();}, 3000);
  }

  downloadResult() {
    let filename = prompt('Zadejte jméno souboru (*.presult):', 'vysledektestu.presult');

    if (filename) {
      //adds csv as extension
      if (!filename.endsWith('.presult')) filename = filename.concat('.presult');
      //labels first row
      //let content = this.data.join(',');//'Time,' + this.labels + '\n';
      //transpose each row = variable in specific time
      //let content = this.csvcontent();
      let blob = new Blob([this.lastresult], {type: 'application/json;charset=utf-8;'});
      saveAs(blob, filename);
    }
  }

  downloadCSV() {
    let myresult = JSON.parse(this.lastresult);
    this.api.saveAsCSV(myresult);
  }

  downloadXLSX() {
      let myresult = JSON.parse(this.lastresult);
      let mydata = this.api.parseResultData(myresult);
      //if no item specified - then generate for current testid
      //let item = this.testid;
      let filename = myresult.name.replace('.ptest', '.xlsx');
      //console.log(myresult)
      let wb = XLSX.utils.book_new(); let ws = XLSX.utils.aoa_to_sheet(mydata);
      /* add worksheet to workbook */
      XLSX.utils.book_append_sheet(wb, ws, 'test_results');
      XLSX.writeFile(wb, filename);

      /*
              let content = await this.mergeResults(items);
        let wb = XLSX.utils.book_new(); let ws = XLSX.utils.aoa_to_sheet(content);
    XLSX.utils.book_append_sheet(wb, ws, 'test_results');
    XLSX.writeFile(wb, filename2);
       */
  }
}
