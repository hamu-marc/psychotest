export class Taskwaveformsegment {
  addsegment() {
    let peaks = window.psychoapi.peaks;
    let startTime = peaks.player.getCurrentTime();
    let endTime = startTime + 1;

    peaks.segments.add({
      startTime: startTime,
      endTime: endTime,
      editable: true
    });
  }
}
