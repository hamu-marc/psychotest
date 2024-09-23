export class Dsl {
  static isZvuk(c) { return /^[\s]*stimulus/.test(c); }
  static isText(c) { return /^[\s]*text/.test(c); }
  //    isVideo(c) { return /^[\s]*video/.test(c); }
  static isOtazka(c) { return /^[\s]*task/.test(c); }
  static isPanel(c) { return /^[\s]*panel/.test(c); }
  //    isParvaOtazka(c) { return /^[\s]*taskpair/.test(c); },
  static isTaskForStimuli(c) { return /^[\s]*taskforstimuli/.test(c); }
  static startsWithZvuk(c) { return /^[\s]*stimulus/.test(c); }
  static startsWithComment(c) { return /^[\s]*#/.test(c); }
  //isObrazovka2(c) { return /^[\s]*dvouobrazovka/ .test(c); },
  static isKategorie(c) { return /^[\s]*screen per 1/.test(c); }
  static isParovy(c) { return /^[\s]*screen per 2/.test(c); }
  static isObrazovka(c) { return /^[\s]*screen/.test(c); }
  static isSloupce(c) { return /^[\s]*column/.test(c); }
  static isHodnoty(c) { return /^[\s]*values/.test(c); }
  static isCheckboxvalues(c) { return /^[\s]*checkboxvalues/.test(c); }
  static isCheckboxvaluesOnRow(c) { return /^[\s]*checkboxvaluesonrow/.test(c); }
  //isSkalovaci(c) { return /^[\s]*taskscale/ .test(c); },
  static isSkalovaciHodnoty(c) { return /^[\s]*scalevalues/.test(c); }
  static isSkala(c) { return /^[\s]*scale/.test(c); }
  static isPopis(c) { return /^[\s]*edit/.test(c); }
  static isSerad2d(c) { return /^[\s]*ranking2d/.test(c); }
  static isPoradiVNtici(c) { return /^[\s]*randomintuple/.test(c); }
  static isPoradiZvuku(c) { return /^[\s]*randomstimuli/.test(c); }
  static isPoradiCase(c) { return /^[\s]*randomscreen/.test(c); }
  static isRandomPairs(c) { return /^[\s]*randompairs/.test(c); }
  static isValuesOnRow(c) { return /^[\s]*valuesonrow/.test(c); }
  static isSelect(c) { return /^[\s]*select/.test(c); }
  static isCSS(c) { return /^[\s]*#css/.test(c); }
  static isStyle(c) { return /^[\s]*#style/.test(c); }
  static isStyleButton(c) { return /^[\s]*#stylebutton/.test(c); }
  static isStyleForm(c) { return /^[\s]*#styleform/.test(c); }
  static isType(c) { return /^[\s]*type /.test(c);}
  static isExtends(c) {return /^[\s]*extends /.test(c);}
  static isStimuliGroup(c) {return /^[\s]*stimuligroup /.test(c);}
  static isWithStimuli(c) {return /^[\s]*withstimuli/.test(c);}
  static isWithStimuligroup(c) {return /^[\s]*withgroup/.test(c);}
  static stimuliType(c) {return /\(([^)]+)\)/.exec(c);}
  //v2.0
  static isImageMultipoint(c) {return /^[\s]*imagemultipoint/.test(c);}
  static isImagePoint(c) {return /^[\s]*imagepoint/.test(c);}
  static isVideoMultipoint(c) {return /^[\s]*videomultipoint/.test(c);}
  static isVideoPoint(c) {return /^[\s]*videopoint/.test(c);}
  static isWaveform(c) {return /^[\s]*waveformpoint/.test(c);}
  static isWaveformsegment(c) {return /^[\s]*waveformsegment/.test(c);}
  static isBase(c) {return /^[\s]*base/.test(c);}
  static isNewRow(c) {return /^[\s]*newrow/.test(c);}
  static isTemplate(c) {return /^[\s]*template/.test(c);}
  static isDesign(c) {return /^[\s]*design/.test(c);}
}
