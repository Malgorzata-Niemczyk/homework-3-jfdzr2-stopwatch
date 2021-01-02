console.log('Good luck!')

const startBtn = document.querySelector('#start');
const nextBtn = document.querySelector('#next');
const stopBtn = document.querySelector('#stop');
const pauseBtn = document.querySelector('#pause');
const saveBtn = document.querySelector('#save');
const resetBtn = document.querySelector('#reset');
const timerDisplay = document.querySelector('#timer-display');
const nextResultDisplay = document.getElementById('next-result-display');

let min = 0;
let sec = 0;
let milisec = 0;
let timerState; // to store the timer values

stopBtn.style.display = 'none';

// Starting the timer
function startTimer() {
    if (!timerState) {
        timerState = setInterval(formatTimer, 10);
        stopBtn.style.display = 'block'
    }            
};

function formatTimer() { 
    milisec++
    
    if (milisec === 99) {
        milisec = 0;
        sec++;
    };

    if (sec === 59) {
        sec = 0;
        min++;
    };

    timerDisplay.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);
};

function stopTimer() {
    clearInterval(timerState);
    timerState = false;

    stopBtn.style.display = 'none'
};


function pauseTimer() {
    clearInterval(timerState);
    timerState = false;
};

function resetTimer() {
    clearInterval(timerState);
    timerState = false
    min = 0;
    sec = 0;
    milisec = 0;
    
    timerDisplay.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);

    nextResultDisplay.innerHTML = '';
}

function displayNextResult() {
    let liItem = document.createElement('li');
    liItem.setAttribute('class', 'next-result-item');
    liItem.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);
    nextResultDisplay.appendChild(liItem);
}


startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);
nextBtn.addEventListener('click', displayNextResult);
