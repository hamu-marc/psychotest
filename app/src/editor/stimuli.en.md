# Organization of Stimuli

## At the same location as test definition
Stimuli are taken from the same resource relative to test definition.

E.g. test definition is in you owncloud account shared with link which
contains these files:
```
mytest.ptest
stimulus1.wav
stimulus2.wav 
```

Then your test may use relative path to `stimulus1.wav` as e.g.:

```
mytest.ptest:
  test My test
  screen Comparison of stimuli
  stimuli stimulus1.wav stimulus2.wav
  task ...
    values 1,2,3,4,5
```

## Different location
If stimuli are located outside your ownlcoud account, but are accessible by URL only,
then you may set base location of stimuli using `base [someurl]` syntax.

```
mytest.ptest:
  test My test where stimuli are placed outside
  base https://sharedlink.com/folder/
  screen Comparison of stimuli
  stimuli stimulus1.wav stimulus2.wav
  task ...
     valuse 1,2,3,4
```
Then your simuli should be accessuble using `[someurl]/stimuli1.wav`

