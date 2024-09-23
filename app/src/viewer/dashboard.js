import {PsychoApi} from '../components/psychoapi';

export class Dashboard {
  static inject = [PsychoApi];
  statictests = [];
  tests = [];
  /*[{_id: 'N4IgTgpgtg9gLhAlgqIBcoAmMDuA7AGxgENM4YBrCPdECAGQHEBpYgTzwAsBVAVgE0AGgBUAQtxAAacBADOAVwJxyVGmjpNWHHgJHipIOGwAOEWgHl8AYyLzMVuXghwQAX2nHicTrQOJMtAAiMHh4xACCocQATAD6snCIUIpsAHTGCAluQA%3D',
    name: 'Percepční hodnocení vlastností pěveckého provedení koloraturní árie.',
    description: 'V tomto testu jsou prezentovány stimulové ukázky ze studie <b>Frič, M., Berti, A., & Otčenášek, J. (2019).</b><i> Percepční hodnocení vlastností pěveckého provedení koloraturní árie.</i> Musicologica Brunensia, 54(1), 187–222. <a href="https://doi.org/10.5817/MB2019-1-13">doi.org/10.5817/MB2019-1-13</a>'},
  {_id: 'N4IgTgpgtg9gLhAlgqIBcoAmMDuA7AGxgENM4YBrCPdECgNhwDkBVOADgDEA1AdgBVMAYwDqATRAAacBADOAVwJxyVGmhAAtAGZCATPIAeAEQBeAc1kALbgBkADDakg4ATwAOEWgHl8QovOE5PAg4EABfaTdiOEtaJ0RMWg1qFwBZYgBpeQBaWThiPExiMEwXAGYAfQA3ABYAOjcEPPCgA==',
    name: 'Hodnocení poruchy ženského hlasu na RBASI škálách',
    description: 'Výuková prezentace zvukových záznamů - pacientek s různou poruchou hlasu.' +
      'Prezentace je zaměřena na výuku hodnocení stupně poruchy hlasu v standardních vlastnostech RBASI.'},
  {_id: 'N4IgTgpgtg9gLhAlgqIBcoAmMDuA7AGxgENM4YBrCPdECgNhwDkBVOADgDEA1AdgBVMAYwDqATRAAacBADOAVwJxyVGmhAAtAGZCATPIAeAEQBeAc1kALbgBkADDakg4ATwAOEWgHl8QovOE5PAg4EABfaTdiOEtaJ0RMWgB6ACUAIQBBAGUAWih5E0QcgDcXeQpiADo3BFlQsKA',
    name: 'RBAS škály - vysvětlení (mužský hlas)',
    description: 'poslechový test, kterého cílem je nácvik hodnocení hlasu v standarních škálách patologického hlasu GRBAS, doplněnou o vlastnosti INSTABILITY.'},
  {_id: 'N4IgTgpgtg9gLhAlgqIBco4E8AOF0gDyA7gHYDGANjAK4Am5EAzqRHCADQh0xnUCGdODADWEUgQDqALwASANQCaxMAA0AHAEcAqnW0AFJiAC+XHPzgALApxCI6BOtBgBGfTCg1yIrADocCEzsxkA',
    name: 'Demo test - prezentace stimulů podle dokumentace. ',
    description: 'Tento demo test je citován v dokumentaci v kapitole prezentace výsledků více viz <a href="https://hamu-marc.gitbook.io/psychotest-doc/typy-stimulu-a-jejich-prezentace">hamu-marc.gitbook.io/psychotest-doc/typy-stimulu-a-jejich-prezentace</a>'},
  {_id: 'N4IgTgpgtg9gLhAlgqIBco4E8AOF0gDyA7gHYDGANjAK4Am5EAzqRHCADQh0xnUCGdODADWEUgQDqALwASANQCaxMAA0AHAEcAqnW0AFJiAC+XHPzgALApxCI6BOtBgBWAHQBlCGH7SYAN35yRAAVAFEPEOCmSn43HAQmdmMgA==',
    name: 'Demo test - seřazovací - ranking2d ',
    description: 'Tento demo test prezentuje možnosti užití seřazovacího testu (ranking2d) více viz <a href="https://hamu-marc.gitbook.io/psychotest-doc/typy-ukolu-task-a-jejich-prezentace/serazovaci-tridici-ukol">hamu-marc.gitbook.io/psychotest-doc/typy-ukolu-task-a-jejich-prezentace/serazovaci-tridici-ukol</a>'}];
*/
  constructor(pa) {
    //this.tests = [];
    this.api = pa;
  }

  async attached() {
    this.loginurl = this.api.apiurl + '/b2access/login2?next=' + window.location;
    this.logouturl = this.api.apiurl + '/b2access/logout?next=' + window.location;
    this.tests = await this.api.getDashboardTests();
    /*this.api.getStaticTests()
      .then(data => {
        this.statictests = data;
      });*/
    /*this.api.getUserInfo()
      .then(ui => {
        this.ui = ui;
        this.islogged = ui && (ui.id.length > 0);
        this.api.getApiTests()
          .then(data => {
            //console.log('data', data)
            this.tests = data;
          });
      });*/
  }
}


