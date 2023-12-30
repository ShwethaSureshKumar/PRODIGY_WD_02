let startTime, running, laps = [];

function startStop() {
  if (running) {
    running = false;
  } else {
    running = true;
    startTime = Date.now() - laps.reduce((acc, lap) => acc + lap, 0);
    update();
  }
}

function pause() {
  running = false;
}

function reset() {
    running = false;
    laps = [];
    updateDisplay(0);
    const lapTimesContainer = document.getElementById('lap-times-container');
    lapTimesContainer.style.display = 'none';
    location.reload(); 
}




function update() {
  if (running) {
    const elapsedTime = Date.now() - startTime;
    updateDisplay(elapsedTime);
    requestAnimationFrame(update);
  }
}

function updateDisplay(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  document.getElementById('stopwatch').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

function updateLapTimes() {
    const lapTimesElement = document.getElementById('lap-times');
    const currentTime = Date.now() - startTime;
  

    const lapsInfo = laps.map((lap, index) => {
      const lapTime = formatTime(lap);
      return `Lap ${index + 1}:  ${lapTime} `;
    });
  
    lapTimesElement.innerHTML = lapsInfo.join('<br>');
  }
  
  

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}



function toggleLapTimesVisibility() {
    const lapTimesContainer = document.getElementById('lap-times-container');
    lapTimesContainer.style.display = lapTimesContainer.style.display === 'none' ? 'flex' : 'flex';
}



function lap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        laps.push(lapTime);
        updateLapTimes();
        toggleLapTimesVisibility(); 
    }
}

