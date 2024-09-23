import {saveAs} from 'file-saver';
import {inject} from 'aurelia-framework';
import {PsychoApi} from '../components/psychoapi';
@inject(PsychoApi)
export class Innerresult {
    showresult = false;
    results = [];
    constructor(pa) {
        this.api = pa;
    }
    async attached(){
        this.results = await this.api.localGet();
    }
    show(){
        this.showresult = true;
    }
    hide(){
        this.showresult = false;
    }
    
    saveResult(myresult){
        let filename = prompt('Zadejte jméno souboru (*.presult):', myresult.name+'.presult');

        if (filename) {
            //adds csv as extension
            if (!filename.endsWith('.presult')) filename = filename.concat('.presult');
            //labels first row
            //let content = this.data.join(',');//'Time,' + this.labels + '\n';
            //transpose each row = variable in specific time
            //let content = this.csvcontent();
            let blob = new Blob([myresult.result], {type: 'application/json;charset=utf-8;'});
            saveAs(blob, filename);
        }
    }
}