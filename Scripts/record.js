
const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

var canvas = document.querySelector('#mycanvas');


const recordButton = document.querySelector('button#record');
// const playButton = document.querySelector('button#play');
const downloadButton = document.querySelector('button#download');
recordButton.onclick = toggleRecording;
// playButton.onclick = play;
downloadButton.onclick = download;

// Start the GL teapot on the canvas
// main();

var stream
function setStream(){
  stream=canvas.captureStream(); // frames per second
}


function handleSourceOpen(event) {

  sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');

}

function handleDataAvailable(event) {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function handleStop(event) {

  const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
  // video.src = window.URL.createObjectURL(superBuffer);
}

function toggleRecording() {
  if (recordButton.textContent === 'Start Recording') {
    startRecording();
  } else {
    stopRecording();
    recordButton.textContent = 'Start Recording';
    // playButton.disabled = false;
    downloadButton.disabled = false;
  }
}

// The nested try blocks will be simplified when Chrome 47 moves to Stable
function startRecording() {
  canvas = document.querySelector('#mycanvas');
  setStream();
  
  let options = {mimeType: 'video/webm'};
  recordedBlobs = [];
  try {
    mediaRecorder = new MediaRecorder(stream, options);
  } catch (e0) {
  
    try {
      options = {mimeType: 'video/webm,codecs=vp9'};
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e1) {
  
      try {
        options = 'video/vp8'; // Chrome 47
        // options = {mimeType: 'video/webm; codecs=vp9'};
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e2) {
        alert('MediaRecorder is not supported by this browser.\n\n' +
          'Try Firefox 29 or later, or Chrome 47 or later, ' +
          'with Enable experimental Web Platform features enabled from chrome://flags.');
        console.error('Exception while creating MediaRecorder:', e2);
        return;
      }
    }
  }

  recordButton.textContent = 'Stop Recording';
  // playButton.disabled = true;
  downloadButton.disabled = true;
  mediaRecorder.onstop = handleStop;
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start(100); // collect 100ms of data

}

function stopRecording() {
  mediaRecorder.stop();

  // video.controls = true;
}

function play() {
  // video.play();
}

function download() {
  const blob = new Blob(recordedBlobs, {type: 'video/webm'});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'Media File.webm';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);
}