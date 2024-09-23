import {bindable} from 'aurelia-framework';

function isCaseInsensitiveTrue(variable) {
    return typeof variable === 'string' && variable.trim().toLowerCase() === 'true';
  }

  export class Taskedit {
    @bindable id;    
    @bindable title;
    @bindable color='';    

    bind(){
        //this.rowbetweenvalues = !isCaseInsensitiveTrue(this.onrow);
        //this.valuesArray = this.values.split(',')        
    }

    attached(){
        
    }

    setAnswer(){
        if (window.ri) {window.ri.setAnswerById(this.id,this.editvalue)}
        //return true;
    }
  
}