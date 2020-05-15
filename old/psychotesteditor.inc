
    <div id="tabs">
        <ul>
            <li><a href="#tab_0">Seznamy</a></li>
            <li><a href="#tab_1"><asp:Localize Text="<%$ Resources: Resource1, editor %>" runat="server"/></a></li>
            <li><a href="#tab_3"><asp:Localize Text="<%$ Resources: Resource1, editorgroups %>" runat="server"/></a></li>
            <li><a href="#tab_4"><asp:Localize Text="<%$ Resources: Resource1, test %>" runat="server"/></a></li>
            <li><a href="#tab_5"><asp:Localize Text="<%$ Resources: Resource1, results %>" runat="server"/></a></li>
            <li><a href="#tab_6"><asp:Localize Text="<%$ Resources: Resource1, groupresults %>" runat="server"/></a></li>
        </ul>

        <div id="tab_0">
            <h2>Seznamy</h2>
            <p>
                <asp:Localize Text="<%$ Resources: Resource1, editorselect %>" runat="server">Select</asp:Localize>
            </p>
            <input type="button" name="createNewTest" value='<asp:Localize Text="<%$ Resources: Resource1, createtest %>" runat="server"/>' onclick="createNewTest(editor)" />
            <div class="select-style w3-btn-bar" size="10" name="selectionField" id="tests">
                <option value="mysinc">..obtaining list from server...</option>
            </div>
            <p>
                <asp:Localize Text="<%$ Resources: Resource1, editorselectstimuli %>" runat="server">Select</asp:Localize>
            </p>
<p>Paused tests:</p>
            <ul id="pausedtests">

            </ul>
            <script>
                updatePausedList();
            </script>

        </div>
        <div id="tab_1">
                        <div class="w3-threequarter w3-container">
                            <p>
                              <asp:Localize Text="<%$ Resources: Resource1, editornotes %>" runat="server">editor notes</asp:Localize>
                              <a href="http://patf-biokyb.lf1.cuni.cz/wiki/projekty/psychoakusticke_testy/navrh_dsl_jazyka">PSYCHOACOUSTIC-DSL</a></p>
                            <textarea id="code" name="code">
test psychoacoustictest
                            </textarea>
                            <form name="saveAs">
                                <input type="button" name="saveAs" value='<asp:Localize Text="<%$ Resources: Resource1, savetest %>" runat="server"/>' onclick="postEditedTest(editor)" />
                                <input type="button" name="deleteAs" value='<asp:Localize Text="<%$ Resources: Resource1, deletetest %>" runat="server"/>' onclick="deleteEditedTest(editor)" />
                              <input type="button" name="editMode" value='<asp:Localize Text="<%$ Resources: Resource1, editedu %>" runat="server"/>' onclick="editEduMode(editor)"/>
                              <input type="button" name ="saveEdu" value='<asp:Localize Text="<%$ Resources: Resource1, saveedu %>" runat="server"/>' onclick="saveEduMode()"/>
                            </form>

                            <script>
                              updateTestList();
                              // Initialize CodeMirror editor with a nice html5 canvas demo.
                              var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
                              mode: 'text/psychotest-dsl',
                              lineNumbers: true,
                              lineWrapping:true
                              });
                            </script>
                        </div>


                        <div class="w3-quarter w3-container w3-sand">
                          <p><asp:Localize Text="<%$ Resources: Resource1, editorstimgroup %>" runat="server">select stimuli group</asp:Localize></p>
                          <select size="4" class="group" name="selectionField2" id="listOfGroupSounds" onchange="getSelectedGroup(this,'listOfSounds')"></select>
                            <select multiple="true" size="10" name="selectionField2" id="listOfSounds"></select>
                            <form name="sounds">
                              <input type="button" name="insertS" value='<asp:Localize Text="<%$ Resources: Resource1, addstimuli %>" runat="server"/>' onclick="insertSelectedSounds('listOfGroupSounds','listOfSounds')" />
                              <input type="button" name="insertS" value='<asp:Localize Text="<%$ Resources: Resource1, addrowstimuli %>" runat="server"/>' onclick="insertSelectedSoundsInRow('listOfGroupSounds','listOfSounds')" />
                              <input type="button" onclick="updateSoundList('listOfSounds');updateGroupSoundList('listOfGroupSounds');" value="refresh"/>
                            </form>
                            <script>
                              updateSoundList('listOfSounds');
                              updateGroupSoundList('listOfGroupSounds');
                            </script>



                          <div id="ToolTipTable">
                            <p class="w3-tooltip">
                              <b>test [jmeno testu]</b>
                              <span class="w3-text">
                                na prvním řádku definice testu, jméno testu je použito jako pojmenování uložené v databázi.<i>test Hrubost Trombonu</i>
                              </span>
                            </p>

                            <p class="w3-tooltip">
                              <b># [poznamka]</b> 	komentář je ignorován.
                            </p>
                            <p class="w3-tooltip">
                              <b>// [poznamka]</b> 	komentář je ignorován.
                            </p>
                            <p class="w3-tooltip">
                              <b>text [any text]</b>
                              <span class="w3-text">
                                text, který se zobrazí na dané obrazovce včetně HTML značek. <i>text &lt;b&gt;Vyberte zvuk&lt;b&gt;</i>
                              </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>stimulus [filename.wav] [filename.ogg] [“[„starttime,duration“]“] [filename2.wav] [filename2.ogg]</b>
                              <span class="w3-text">
                                stimuli (audio (mp3,wav,ogg), video (mp4)), které lze na obrazovce přehrát, musí odkazovat na existující wav, mp3, ogg, mp4, jpg, png a txt soubor dostupný na serveru, soubory se stejným jménem a jinou příponou generují varianty pro prohlížeč, soubor s jiným jménem generuje další stimul (tlačítko pro audio, video) na obrazovce. Pokud se použije parametry <b>starttime</b> a <b>duration</b> v hranatých závorkách pak pro audio to určí interval, který se ze zvukového souboru přehraje.<i>stimulus trombone.wav [1000,3000] </i>
                              </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>task [Nazev otazky]</b>
                              <span class="w3-text"> 	Vygeneruje formulář, který sbírá odpověď na danou otázku</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>values [1,2,3,…]</b>
                              <span class="w3-text"> 	Předdefinované hodnoty na otázku na předchozím řádku oddělené čárkou nebo mezerou, hodnota v uvozovkách může obsahovat mezery a čárky</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>valuesonrow [1,2,3,…] </b>
                              <span class="w3-text">	viz předchozí, hondoty jsou vykresleny na řádek</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>checkboxvalues [1,2,3,…]</b>
                              <span class="w3-text"> 	Předdefinované hodnoty na otázku na předchozím řádku oddělené čárkou nebo mezerou, lze vybrat 0 az vsechny hodnoty </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>checkboxvaluesonrow [1,2,3,…]</b>
                              <span class="w3-text"> 	viz předchozí, hondoty jsou vykresleny na řádek.</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>screen</b>
                              <span class="w3-text"> 	definuje následující obrazovku, v testu dostupnou pomocí tlačítka dál </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>screen per 1 [nazev obrazovek]</b>
                              <span class="w3-text">	Pro kazdy radek stimulu generuje obrazovku se shodnymi tasky</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>screen per 2 [screen names]</b>
                              <span class="w3-text">	Párový test, ze vsech radku stimulu generuje vsechny kombinace párů a pro každou kombinaci vytvoří obrazovku - pro 2 zvuky 1, pro 3 zvuky 3, pro 4 zvuky 6, atd. </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>taskforstimuli</b>
                              <span class="w3-text"> 	Jako task. Otázka se týká každého stimulu z vygenerovaného páru, pro každý stimul se vytvoří otázka s příponou #1 nebo #2 podle toho, kterého ze stimulu se otázka týká</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>scalevalues</b>
                              <span class="w3-text"> 	Jako scale. Hodnocení zvuku nebo více zvuku pomocí škály s výčtem hodnot</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>edit [?]</b>
                              <span class="w3-text"> 	Vygeneruje textové pole, do kterého lze zapsat slovní popis stimulu. Pokud je přidán otazník za klíčovým slovem popis, pak odpověď není vyžadována pro pokračování či uložení testu. </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>ranking2d [popis osy X];[popis osy Y]</b>
                              <span class="w3-text">	Grafické pole, pro každý zvuk přítomný na dané obrazovce vytvoří ikonu, která je iniciálně vlevo a dá se myší přemístit v 2d poli, na obrazovce může být max. 1 takovýto prvek. Výsledkem je pole souřadnic ve tvaru „X1,Y1 X2,Y2“ tj. koordináty ikony X-ová 0-800 zleva doprava a Y-ová 0-150 ze shora dolů.</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>randomintuple</b>
                              <span class="w3-text">	nastavuje, že stimuli se v rámci n-tice (stimuly na řádku) promíchají v testu náhodně</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>randomstimuli</b>
                              <span class="w3-text"> 	nastavuje, že stimuli v rámci screen per 1 a screen per 2 se promíchají náhodně </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>randomscreen</b>
                              <span class="w3-text"> 	nastavuje, že všechny obrazovky v testu se při vykonávání promíchají v náhodném pořadí</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>select</b>
                              <span class="w3-text"> 	Vytvori dropdown list s hodnotami pro task </span>
                            </p>
                            <p class="w3-tooltip">
                              <b>type [educational, nopreviousbutton/yespreviousbutton]</b>
                              <span class="w3-text"> 	definuje typ testu a dalsi nastaveni, edukacni mod, zobrazeni a umozneni vratit se o obrazovku zpet.</span>
                            </p>
                            <p class="w3-tooltip">
                              <b>panel</b>
                              <span class="w3-text"> 	obsahuje v sobe pouze informacni text, bez otazky a odpovedoveho pole </span>
                            </p>
                          </div>
                        </div>
          <p align="center" class="footer"><asp:Localize Text="<%$ Resources: Resource1, footercopy %>" runat="server">T.K.</asp:Localize></p>
                           <div id="eduTable">

                          </div>
          <p align="center" class="footer" id="permanentlink"></p>

        </div>

        <div id="tab_3">
          <div class="container2">
            <div class="container1">
              <div class="col21">
                <!-- Column one start -->
                <input type="button" onclick="updateSoundList('listOfSounds2');updateGroupSoundList('listOfGroupSounds2');" value="refresh"/>
                <p><asp:Localize Text="<%$ Resources: Resource1, stimulinotes %>" runat="server"/></p>
                <select size="10" class="group" id="listOfGroupSounds2" onchange="getSelectedGroup(this,'listOfSounds2')"></select>
                <form name="sounds">
                  <input type="button" name="uploadS" value='<asp:Localize Text="<%$ Resources: Resource1, uploadstim %>" runat="server"/>' onclick="uploadSoundsForm('listOfGroupSounds2')" /><br/>
                  <input type="button" name="makeG" value='<asp:Localize Text="<%$ Resources: Resource1, createstimgroup %>" runat="server"/>' onclick="createGroup('listOfGroupSounds2','listOfGroupSounds3')" /><br/>
                  <input type="button" name="deleteG" value='<asp:Localize Text="<%$ Resources: Resource1, deletestimgroup %>" runat="server"/>' onclick="deleteGroup('listOfGroupSounds2','listOfGroupSounds3')" /><br/>
                </form>
                <!-- Column one end -->
              </div>
              <div class="col22">
                <!-- Column two start -->

                <select multiple="true" size="20" id="listOfSounds2"></select>
                <!-- Column two end -->
              </div>
              <script>
                updateSoundList('listOfSounds2');
                updateGroupSoundList('listOfGroupSounds2');
              </script>
            </div>
          </div>
            <p align="center" class="footer"><asp:Localize Text="<%$ Resources: Resource1, footercopy %>" runat="server"/></p>
        </div>



        <div id="tab_4">
            <h2><asp:Localize Text="<%$ Resources: Resource1, test %>" runat="server"/></h2>
            <p><asp:Localize Text="<%$ Resources: Resource1, testnotes %>" runat="server"/></p>
            <button type="button" id="reset" style="float:left" onclick="cleartest()"><asp:Localize Text="<%$ Resources: Resource1, buttonreset %>" runat="server"/></button>
            <button type="button" id="start" style="float:left" onclick="starttest()"><asp:Localize Text="<%$ Resources: Resource1, buttonstart %>" runat="server"/></button>
          <input type="checkbox" id="dontcheckanswers" style="float:left" value="skip answer check"/><label for="dontcheckanswers">
            <span>
              <span></span>
            </span>
            <asp:Localize Text="<%$ Resources: Resource1, dontcheckanswers %>" runat="server"/></label>

          <span align="center" id="notification" style="background-color:#ffdddd"></span>
          <!--            <button type="button" id="previous" style="visibility:hidden; float:left" onclick="previoustestitem()"><asp:Localize Text="<%$ Resources: Resource1, buttonprevious %>" runat="server"/></button>
            <button type="button" id="stop" style="visibility:hidden; float:right" onclick="submittest()"><asp:Localize Text="<%$ Resources: Resource1, buttonstop %>" runat="server"/></button>
            <button type="button" id="next" style="visibility:hidden; float:right" onclick="nexttestitem()"><asp:Localize Text="<%$ Resources: Resource1, buttonnext %>" runat="server"/></button>
            -->
            <hr />
            <div id="preview"></div>
            <hr />
            <button type="button" id="previous2" style="visibility:hidden; float:left" onclick="previoustestitem()"><asp:Localize Text="<%$ Resources: Resource1, buttonprevious %>" runat="server"/></button>
            <button type="button" id="pause2" style="visibility:hidden; float:left" onclick="pausetest();"><asp:Localize Text="<%$ Resources: Resource1, buttonpause %>" runat="server"/></button>
            <button type="button" id="stop2" style="visibility:hidden; float:right" onclick="if (submittest()) focusFinal();"><asp:Localize Text="<%$ Resources: Resource1, buttonstop %>" runat="server"/></button>
            <button type="button" id="next2" style="visibility:hidden; float:right" onclick="nexttestitem()"><asp:Localize Text="<%$ Resources: Resource1, buttonnext %>" runat="server"/></button>
            <br />
            <script>
            </script>
        </div>
        <div id="tab_5">
            <h2><asp:Localize Text="<%$ Resources: Resource1, results %>" runat="server"/></h2>

          <div id="resultmenu">
            <select size="10" name="selectionField" id="results" onchange="getSelectedResult(this)">
                <option value="mysinc">..obtaining list..</option>
            </select>
          </div>
          <button style="float:right;" onclick="enablerawresults()">Zpracovani hrubych vysledku</button>
          <textarea id="rawresults" style="display:none"  placeholder="{'type':'some JSON data from console log'}"></textarea>
          <button id="rawresultbutton" onclick="submitrawresults()">Potvrdit hrube vysledky</button>
          <script>
/* eslint-disable no-var */
var showrawtextarea = false;
// eslint-disable-next-line no-unused-vars
//switch on-off button and text area to submit
function enablerawresults() {
  showrawtextarea = ! showrawtextarea; //switch
  if (showrawtextarea) {
    $('#rawresults').show();
    $('#rawresultbutton').show();
  } else {
    $('#rawresults').hide();
    $('#rawresultbutton').hide();
  }
}
//set handontable to contain data from raw results of textarea
function submitrawresults() {
  var item = $('#rawresults').val();
  console.log('submitrawresults', item);
  showrawtextarea = false;
  $('#rawresults').hide();
  $('#rawresultbutton').hide();

  data = [];
  //data.push(["id", "test", "respondent", "case", "task", "odpověď"]);
  // eslint-disable-next-line vars-on-top
  var maxrow = 0;
  item.resultItems.forEach(function(subitem) {
    //subitem.replace(/({)([a-zA-Z0-9]+)(:)([a-zA-Z0-9\.\/])/,'$1"$2"$3')
    //var tempsubitem = subitem.replace(/({)([^:]+)(:)([^,]*)(,)([^:]+)(:)([^,]*)(,)([^:]+)(:)([^,]*)(,)([^:]+)(:)([^}]*)(})/, '$1"$2"$3"$4"$5"$6"$7"$8"$9"$10"$11"$12"$13"$14"$15"$16"$17');
    //var tempsubitem = subitem.replace(/({)([^:]+)(:)([^,]*)(,)([^:]+)(:)([^,]*)(,)([^:]+)(:)([^}]*)(})/, '$1"$2"$3"$4"$5"$6"$7"$8"$9"$10"$11"$12"$13"$14');
    //corect mallformed JSON - add quotes to the key
    //fix bug -- items not in table columns
    //var tempsubitem = subitem.replace(/\"/, '\\"');

    /*subitem.replace(({|,)([^:]+)(:)([^,}]*)/g, '$1"$2"$3"$4"');
    //var objKeysRegex = /({|,)(?:\s*)(?:')?([A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*):({|,)(?:\s*)(?:')?([A-Za-z0-9_ \-\.$]*)(?:')?(?:\s*)/g;// look for object names
    //var tempsubitem = subitem.replace(objKeysRegex, "$1\"$2\":$3\"$4");// all object names should be double quoted
    */
    var newitem = [];

    newitem.push(item.id);
    newitem.push(item.name);
    newitem.push(item.user);

    //fix bug #245
    newitem.push(subValue(subitem, "case:", "question:"));
    newitem.push(subValue(subitem, "question:", "answer:"));
    newitem.push(subValue(subitem, "answer:", "date:"));
    if (subitem.contains('note:')) {
      newitem.push(subValue(subitem, "date:", "note:"));
      newitem.push(subValue(subitem, "note:", "}"));
    } else
      newitem.push(subValue(subitem, "date:", "}"));
    if (maxrow < newitem.length) maxrow = newitem.length;
    data.push(newitem);
  });

  //add empty last row
  newitem = [];

  // eslint-disable-next-line vars-on-top
  for (var i = 0; i < maxrow; i++) newitem.push("");
  data.push(newitem);
  //console.log("updateResultTable()");
  //console.log(data);
  //console.log(data2);
  exportCSVData(data, resultname);
  $("#"+resultid).handsontable({
    data: data,

    colHeaders: ["id", "test","respondent","case","task","answer","date","note"],
    rowHeaders: true,
    currentRowClassName: 'currentRow',
    currentColClassName: 'currentCol',
    minSpareRows: 1,
    minSpareCols: 1,
    fillHandle: true,
    contextMenu: ['row_above', 'row_below', 'remove_row', 'col_left', 'col_right', 'remove_col']
  });
}



          </script>
          <div id="resultcsv"></div>
            <div id="resultTable"></div>
            <div style="clear:both"></div>
        </div>
            <div id="tab_6">
            <h2><asp:Localize Text="<%$ Resources: Resource1, groupresults %>" runat="server"/></h2>
          <div id="resultmenu">
            <select size="10" name="selectionField" id="results2" onchange="getSelectedResult2(this)">
                <option value="mysinc">..obtaining list..</option>
            </select>
          </div>
          <!--button id="resultcsv2" onclick="selectElementContents( document.getElementsByClassName('tgrid-table')[1]);">Copy data to clipboard</button-->
              <!-- tgrid -->

<div id="test-knockout" data-bind="tgrid: { provider: itemsProvider, options:gridOptions, pageSize:50, enablePaging:true, pageSlide:3, enableFiltering: true, enableSorting: true, enableGrouping: true, selectionMode: 'multi' }">
    <script type="text/html">
        <column  data-g-member="testid" data-g-filter-member="testid" data-g-group-member="testid" data-g-sort-member ="testid">
        </column>
        <column data-g-member="testname" data-g-filter-member="testname" data-g-group-member="testname" data-g-sort-member ="testname">
        </column>
        <column  data-g-member="respondent" data-g-filter-member="respondent" data-g-group-member="respondent" data-g-sort-member ="respondent">
        </column>
        <column  data-g-member="testcase" data-g-filter-member="testcase" data-g-group-member="testcase" data-g-sort-member ="testcase">
        </column>
        <column  data-g-member="task" data-g-filter-member="task" data-g-group-member="task" data-g-sort-member ="task">
        </column>
        <column  data-g-member="answer" data-g-filter-member="answer" data-g-group-member="answer" data-g-sort-member ="answer">
        </column>
        <column  data-g-member="date" data-g-filter-member="date" data-g-group-member="date" data-g-sort-member ="date">
        </column>
        <filterpopup>
            <div class="filterHeader">
                <span data-bind="text: path"></span><div class="closeConteiner" data-bind="click: onClose"></div>
            </div>
            <select data-bind="options: availableConditions, value: condition, optionsText: 'name', optionsValue: 'value'" class="grid-filter-popup-options">
            </select>
            <input type='text' data-bind='value: value'/><br/>
            <label class="grid-filter-popup-casesens-label">
                <input type="checkbox" data-bind="checked: caseSensitive" class="grid-filter-popup-casesens" /><asp:Localize Text="<%$ Resources: Resource1, casesensitive %>" runat="server"/>
            </label>
            <div class="tgrid-filter-popup-buttons-container">
                <div class="tgrid-filter-popup-button" style="width:70px" data-bind="click: onApply"><asp:Localize Text="<%$ Resources: Resource1, filter %>" runat="server"/></div>
                <div class="tgrid-filter-popup-button" style="width:70px" data-bind="click: onClear"><asp:Localize Text="<%$ Resources: Resource1, clear %>" runat="server"/></div>
            </div>
        </filterpopup>
    </script>
</div>
            <div style="clear:both"></div>
        </div>
    </div>
