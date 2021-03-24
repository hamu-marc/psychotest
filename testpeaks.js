(function(Peaks) {
const options = {
  containers: {
    "zoomview": document.getElementById("zoomview"),
    "overview": document.getElementById("overview")
  },
  mediaElement: document.getElementById("audio"),
  dataUri: {
    arraybuffer: "TOL_6min_720p_download.dat",
    json: "TOL_6min_720p_download.json"
  },
  zoomLevels: [512, 1024, 2048, 4096],
  keyboard: true,
  segments: [
    {
      startTime: 63.0,
      endTime: 125.5,
      editable: true,
      color: "#E7003E",
      labelText: "Chapter: Multi-celled organisms"
    },
    {
      startTime: 225.0,
      endTime: 267.0,
      editable: true,
      color: "#E7003E",
      labelText: "Chapter: Reptiles"
    }
  ]
};
console.log('Peaks demo. Peaks struct:',Peaks);
Peaks.init(options, function(err, peaks) {
  document.getElementById("zoomIn").addEventListener("click", function() {
    peaks.zoom.zoomIn();
  });

  document.getElementById("zoomOut").addEventListener("click", function() {
    peaks.zoom.zoomOut();
  });

  document.getElementById("segment").addEventListener("click", function() {
    var startTime = peaks.player.getCurrentTime();
    var endTime = startTime + 10;

    peaks.segments.add({
      startTime: startTime,
      endTime:   endTime,
      editable:  true
    });
  });

  document.getElementById("point").addEventListener("click", function() {
    var time = peaks.player.getCurrentTime();

    peaks.points.add({
      time:     time,
      editable: true,
      color:    "#006EB0"
    });
  });
});
})(peaks);
