
export class Pausedtest {
  activate(params) {
    this.resumeid = params.resumeid;
    this.pausedtesturl = '#/resumetest/' + this.resumeid;
  }
}
