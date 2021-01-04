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
let timerState = false;

stopBtn.style.display = 'none';
saveBtn.style.display = 'none';

// Starting the timer
function startTimer() {
    if (timerState === false) {
        timerState = setInterval(formatTimer, 10);
        stopBtn.style.display = 'block'
        saveBtn.style.display = 'none';
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
    timerDisplay.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec); // add zeros if less than 10 and add the timer numbers to the HTML
};

function stopTimer() {
    clearInterval(timerState);
    timerState = false;

    stopBtn.style.display = 'none';
    saveBtn.style.display = 'block';
};


function pauseTimer() {
    if (timerState === false) /*clicked to continue running the timer*/ {
        timerState = setInterval(formatTimer, 10);
        stopBtn.style.display = 'block'
        saveBtn.style.display = 'none';
    } else /*clicked to pause the timer*/{
        clearInterval(timerState);
        timerState = false;
        saveBtn.style.display = 'none';
    }; 
};

function resetTimer() {
    clearInterval(timerState);
    timerState = false;
    min = 0;
    sec = 0;
    milisec = 0;
    
    timerDisplay.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);

    nextResultDisplay.innerHTML = '';
}

function displayNextResult() {
    if (timerState !== false) {
        let liItem = document.createElement('li');
        liItem.setAttribute('class', 'next-result-item');
        nextResultDisplay.appendChild(liItem);
        
        liItem.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);
    }
};

function saveTimerResults() {
    if (timerState === false) { // saving the results only when the timer is not running
        let timerResultsArr = [];

        timerResultsArr.push(timerDisplay.innerText);
        localStorage.setItem('timerResults', JSON.stringify(timerResultsArr));
    
        // clearing the timer display and the other timer results upon clicking the save button
        min = 0;
        sec = 0;
        milisec = 0;
        timerDisplay.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);
        nextResultDisplay.innerHTML = '';
    }; 
};


startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);
nextBtn.addEventListener('click', displayNextResult);
saveBtn.addEventListener('click', saveTimerResults);
