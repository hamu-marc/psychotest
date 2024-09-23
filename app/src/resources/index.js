import {PLATFORM} from 'aurelia-pal';

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('../components/stimulusimage'),
    PLATFORM.moduleName('../components/stimulusaudio'),
    PLATFORM.moduleName('../components/stimulusvideo'),
    PLATFORM.moduleName('../components/taskimage'),
    PLATFORM.moduleName('../components/taskscale'),
    PLATFORM.moduleName('../components/taskvideo'),
    PLATFORM.moduleName('../components/taskwaveform'),
    PLATFORM.moduleName('../components/taskvalues'),
    PLATFORM.moduleName('../components/taskedit')
  ]);
}
