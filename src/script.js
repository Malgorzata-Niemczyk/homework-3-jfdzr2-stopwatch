console.log('Good luck!')

const startBtn = document.querySelector('#start');
const nextBtn = document.querySelector('#next');
const stoptBtn = document.querySelector('#stop');
const pauseBtn = document.querySelector('#pause');
const saveBtn = document.querySelector('#save');
const resetBtn = document.querySelector('#reset');
const timerDisplay = document.querySelector('#timer-display');

let min = 00;
let sec = 00;
let milisec = 00;
let timerState; // to store the timer values


// Starting the timer
function startTimer() {
    if (!timerState) {
        timerState = setInterval(formatTimer, 10)
    };  
};

function formatTimer() {
    timerDisplay.innerHTML = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}:${milisec < 10 ? `0${milisec}` : milisec}`;
    milisec++;

    if (milisec === 99) {
        milisec = 00;
        sec++;
    }
};


startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);