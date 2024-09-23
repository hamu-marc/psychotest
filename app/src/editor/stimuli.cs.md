# Organizace stimulů

## stimuli umístěny stejně jako test
Stimuli jsou brány ze stejného lokace jako definice testu relativně.

Např. definice testu je v owncloud účtu pomocí sdíleného linku a obsahuje tyto soubory:
```
mytest.ptest
stimulus1.wav
stimulus2.wav 
```

Pak test může odkazovat stimuli `stimulus1.wav` jako:

```
mytest.ptest:
  test My test
  screen Comparison of stimuli
  stimuli stimulus1.wav stimulus2.wav
  task ...
    values 1,2,3,4,5
```

## Stimuli umístěny jinde
 
Pokud jsou stimuli umístěny mimo váš owncloud účet, ale jsou přístupné
pomocí URL, lze nastavit základní lokalizaci pomocí  `base [someurl]`:

```
mytest.ptest:
  test My test where stimuli are placed outside
  base https://sharedlink.com/folder/
  screen Comparison of stimuli
  stimuli stimulus1.wav stimulus2.wav
  task ...
     valuse 1,2,3,4
```
Pak stimuli jsou postupně načítány pomocí URL: `[someurl]/stimuli1.wav`

