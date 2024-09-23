# Editor psychoakustických a psychovizuálních testů
Tato aplikace umožňuje vytvářet nové a editovat existující 
psychoakustické testy.

```
test Psychoakustický test pro vyhodnocení kvality hlasového projevu zpěváků.
```
```html
test Psychotest
  screen První Obrazovka
```

## stimulusaudio
```
<stimulusaudio src="stimuli/1.wav" ranges="" base="" type="controls"></stimulusaudio>
<stimulusaudio src="stimuli/2.wav" ranges="" base="" type="controls"></stimulusaudio>
<stimulusaudio src="stimuli/3.wav" ranges="" base="" type="controls"></stimulusaudio>
<stimulusaudio src="stimuli/5.wav" ranges="" base="" type="controls"></stimulusaudio>
```
<stimulusaudio src="stimuli/1.wav" ranges="" base="" type="controls"></stimulusaudio>
<stimulusaudio src="stimuli/2.wav" ranges="" base="" type="controls"></stimulusaudio>
<stimulusaudio src="stimuli/3.wav" ranges="" base="" type="controls"></stimulusaudio>
<stimulusaudio src="stimuli/5.wav" ranges="" base="" type="controls"></stimulusaudio>

## ranking2d
```html
<ranking2d random="true" audios="" xlabel="x axis" ylabel="y axis">RANKING2D</ranking2d>
```
<ranking2d random="true" audios="" xlabel="x axis" ylabel="y axis">RANKING2D</ranking2d>

## ranking2d with edu
```html
<ranking2d random="true" audios="" xlabel="x axis" ylabel="y axis" edu="audio[1]160,16|audio[2]255,55|audio[3]381,98">RANKING2D</ranking2d>
```
<ranking2d random="true" audios="" xlabel="x axis" ylabel="y axis" edu="audio[1]160,16|audio[2]255,55|audio[3]381,98">RANKING2D</ranking2d>
## komentáře
<b># [poznamka]</b>

<b>// [poznamka]</b>

## text [jakýkoliv text]
 Text, který se zobrazí na dané obrazovce včetně HTML značek. 
 
 ```html
test Psychotest
  screen První obrazovka
  text Tento test slouží pro hodnocení kvalit hlasového projevu.

 ```

```
  screen Zvuk 1 zobrazen s waveforms
  stimulus(peaks) 1.wav
  task Slysitelnost
  values 1 2
```

## task edit
```html
<taskedit title="hodnotte slovne zvuk" color="w3-green"></taskedit>
```
<taskedit title="hodnotte slovne zvuk" color="w3-green"></taskedit>

## task values
```html
<taskvalues title="hodnotte hlasitost" values="malo,stredne,hodne" color="w3-green"></taskvalues>
<taskvalues title="hodnotte prijemnost" values="neprijemny,stredne,prijemny" onrow="true" color="w3-yellow"></taskvalues>
```
<taskvalues title="hodnotte hlasitost" values="malo,stredne,hodne" color="w3-green"></taskvalues>
<taskvalues title="hodnotte prijemnost" values="neprijemny,stredne,prijemny" onrow="true" color="w3-yellow"></taskvalues>

## task scale
```html
task
  scale 1 2 3 4 5 6

<taskscale title="B - dyšnost" min="0" max="3" step="0.5" labels="0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká" color="w3-pale-yellow" id="i1mhq" preset="b">

```
<b> vyberte hodnotu </b>
<taskscale title="B - dyšnost" min="0" max="3" step="0.5" labels="0,norma;0.5,minim.;1,mírná;2,střední;3,velmi těžká" color="w3-pale-yellow" id="i1mhq" preset="b">

## task image

```
  stimulus stimuli/tomas/IMG_4687.JPG
  task Vyberte v obraze kde se nachazi oko 
     image 
```
<b>Vyberte v obraze kde se nachazi oko.</b>
<stimulusimage src="stimuli/tomas/IMG_4687.JPG" height="300" width="400"></stimulusimage>
<taskimage></taskimage>

## task video

```html
  stimulus stimuli/tomas/clavinovasaxophone.mp4
  task Vyberte misto ve videu 
  video
```

<b> vyberte ve videu kde se nachazi ruka.</b>
<taskvideo src="stimuli/tomas/clavinovasaxophone.mp4" height="300" width="400"></taskvideo>

