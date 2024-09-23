**test [jmeno testu]** na prvním řádku definice testu, jméno testu je použito jako pojmenování uložené v databázi.
```
test Percepční test trombonu
```
**\# [poznamka]  nebo // [poznamka]** komentář v definici testu, při vykonávání je ignorován.
```
# toto je poznámka k definici testu
// toto je další poznámka k definici testu
#css - p{margin-left:10px}   speciální poznámka - definuje CSS styl se selektory jako v CSS souboru
#style margin-left:10px      speciální poznámka - definuje CSS styl pro poslední vygenerovaný element
#styleform margin-left:10px  speciální poznámka - definuje CSS styl pro poslední <form> element
```

**text [any text]** text, který se zobrazí na dané obrazovce včetně HTML značek.
```
text Budete hodnotit tzv <i>hrubost</i> zvuku
```

**stimulus [filename.wav] [filename.ogg] [“[„starttime,duration“]“] [filename2.wav] [filename2.ogg]**
<span class="w3-text">zvuky, obrazky, video, které lze na obrazovce přehrát ukázat.
U zvuku volitelný parametr `[starttime,duration]` určí interval, který se ze zvukového souboru přehraje.
U obrazu a videa parametr`[sirka,vyska]`. rozlisuje se podle pripony souboru (wav,ogg,mp3) jsou zvuky, (mp4) videa, (jpg,png) obrazky</span>
```
stimulus trombone.wav [1000,3000]
stimulus 1.wav [200,500] 2.wav [200,500]
stimulus obraz.png [300,300]
stimulus video.mp4 [300,300]
```


**task [Nazev tasku/ukolu]**
Vygeneruje formulář, který sbírá odpověď na danou otázku/úkol.
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>values [1,2,3,…]</b>
                              <span class="w3-text"> 	Předdefinované hodnoty na otázku na předchozím řádku oddělené čárkou nebo mezerou, hodnota v uvozovkách může obsahovat mezery a čárky</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>valuesonrow [1,2,3,…] </b>
                              <span class="w3-text">	viz předchozí, hodnoty jsou vykresleny na řádek</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>checkboxvalues [1,2,3,…]</b>
                              <span class="w3-text"> 	Předdefinované hodnoty na otázku na předchozím řádku oddělené čárkou nebo mezerou, lze vybrat 0 az vsechny hodnoty </span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>checkboxvaluesonrow [1,2,3,…]</b>
                              <span class="w3-text"> 	viz předchozí, hondoty jsou vykresleny na řádek.</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>screen</b>
                              <span class="w3-text"> 	definuje následující obrazovku, v testu dostupnou pomocí tlačítka dál </span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>screen per 1 [nazev obrazovek]</b>
                              <span class="w3-text">	Pro kazdy radek stimulu generuje obrazovku se shodnymi tasky</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>screen per 2 [screen names]</b>
                              <span class="w3-text">	Párový test, ze vsech radku stimulu generuje vsechny kombinace párů a pro každou kombinaci vytvoří obrazovku - pro 2 zvuky 1, pro 3 zvuky 3, pro 4 zvuky 6, atd. </span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>taskforstimuli</b>
                              <span class="w3-text"> 	Jako task. Otázka se týká každého stimulu z vygenerovaného páru, pro každý stimul se vytvoří otázka s příponou #1 nebo #2 podle toho, kterého ze stimulu se otázka týká</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>scalevalues</b>
                              <span class="w3-text"> 	Podobne jako scale. Hodnocení zvuku nebo více zvuku pomocí škály s výčtem hodnot `scalevalues jemný střední ostrý`</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>scale</b>
                              <span class="w3-text"> 	Hodnocení na číselné škále, kde některým hodnotám může být přiřazen vysvětlující text: scale 0 100 0 málo 33 středně 66 velmi 100 moc </span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>edit [?]</b>
                              <span class="w3-text"> 	Vygeneruje textové pole, do kterého lze zapsat slovní popis stimulu. Pokud je přidán otazník za klíčovým slovem popis, pak odpověď není vyžadována pro pokračování či uložení testu. </span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>ranking2d [popis osy X];[popis osy Y]</b>
                              <span class="w3-text">	Grafické pole, pro každý zvuk přítomný na dané obrazovce vytvoří ikonu, která je iniciálně vlevo a dá se myší přemístit v 2d poli, na obrazovce může být max. 1 takovýto prvek. Výsledkem je pole souřadnic ve tvaru „X1,Y1 X2,Y2“ tj. koordináty ikony X-ová 0-800 zleva doprava a Y-ová 0-150 ze shora dolů.</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>randomintuple</b>
                              <span class="w3-text">	nastavuje, že stimuli se v rámci n-tice (stimuly na řádku) promíchají v testu náhodně</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>randomstimuli</b>
                              <span class="w3-text"> 	nastavuje, že stimuli v rámci screen per 1 a screen per 2 se promíchají náhodně </span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>randomscreen</b>
                              <span class="w3-text"> 	nastavuje, že všechny obrazovky v testu se při vykonávání promíchají v náhodném pořadí</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>select</b>
                              <span class="w3-text"> 	Vytvori dropdown list s hodnotami pro task </span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>type [educational, nopreviousbutton/yespreviousbutton]</b>
                              <span class="w3-text"> 	definuje typ testu a dalsi nastaveni, edukacni mod, zobrazeni a umozneni vratit se o obrazovku zpet.</span>
                            </p>
                            <p class="w3-tooltip" style="margin-top:-10px">
                              <b>panel</b>
                              <span class="w3-text"> 	obsahuje v sobe pouze informacni text, bez otazky a odpovedoveho pole </span>
                            </p>
                          </div>
      </div>
