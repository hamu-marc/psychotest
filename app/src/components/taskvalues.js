import {bindable} from 'aurelia-framework';

function isCaseInsensitiveTrue(variable) {
    return typeof variable === 'string' && variable.trim().toLowerCase() === 'true';
  }

  export class Taskvalues {
    @bindable id;
    @bindable values;
    @bindable title;
    @bindable color='';
    @bindable onrow='false';
    rowbetweenvalues = false;

    bind(){
        this.rowbetweenvalues = !isCaseInsensitiveTrue(this.onrow);
        this.valuesArray = this.values.split(',')        
    }

    attached(){
        
    }

    setAnswer(someValue){
        if (window.ri) {window.ri.setAnswerById(this.id,someValue)}
        return true;
    }
  
}