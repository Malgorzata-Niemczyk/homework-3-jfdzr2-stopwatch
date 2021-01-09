console.log('Good luck!')

const startBtn = document.querySelector('#start');
const nextBtn = document.querySelector('#next');
const stopBtn = document.querySelector('#stop');
const pauseBtn = document.querySelector('#pause');
const saveBtn = document.querySelector('#save');
const resetBtn = document.querySelector('#reset');
const timerDisplay = document.querySelector('#timer-display');
const nextResultDisplay = document.getElementById('next-result-display');

const form = document.querySelector('#modal-results');
const cancelBtn = document.querySelector('.modal-cancel-btn')
let inputElement = document.querySelector('.results-name');

const resultsBoardArea = document.querySelector('.results-board-area');

let min = 0;
let sec = 0;
let milisec = 0;
let timerState = false;

let timerResults = [
    {times: []}
];
let lastTimesList = [];

let cardID = 0;

stopBtn.style.display = 'none';
saveBtn.style.display = 'none';

// Starting the timer
function startTimer() {
    if (timerState === false) {
        timerState = setInterval(formatTimer, 10);
        stopBtn.style.display = 'block'
        saveBtn.style.display = 'none';
        startBtn.style.display = 'none';
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
    startBtn.style.display = 'block';     
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
        startBtn.style.display = 'block';  
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
    lastTimesList = [];
}

function displayNextResult() {
    if (timerState !== false) {
        let liItem = document.createElement('li');
        liItem.setAttribute('class', 'result-item');
        nextResultDisplay.appendChild(liItem);

        timerResults = [
            {times: [(min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec)]}
        ];  

        lastTimesList.push(liItem.textContent = timerResults.map((timerResult) => {
            return `${timerResult.times}`
        }).join(''));

        // console.log(lastTimesList);
    };
};

// saving timer results to localStorage
function saveTimerResults() {
    if (timerState === false) {
        //saving data to Firebase
        firebase.firestore().collection('timer-results').add({
            name: form.name.value
        });
        form.name.value = '';

        // clearing the timer display and the other timer results upon clicking the save button
        min = 0;
        sec = 0;
        milisec = 0;
        timerDisplay.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);
        nextResultDisplay.innerHTML = '';

        // display the modal upon saving the results
        form.style.display = 'flex';
    }; 
};

function addAccordionFeature() {
    const resultHeadings = document.getElementsByClassName('show-result-name');

    Array.from(resultHeadings).forEach(resultHeading => {
        resultHeading.addEventListener('click', () => {
    
            resultHeading.classList.toggle('active');
    
            const resultBodyElements = resultHeading.nextElementSibling;
    
            if (resultHeading.classList.contains('active')) {
                resultBodyElements.style.maxHeight = `${resultBodyElements.scrollHeight}px`;
            } else {
                resultBodyElements.style.maxHeight = 0;
            }
        })
    });
};

 // getting data from Firebase
firebase.firestore().collection('timer-results').onSnapshot(timerData => {
    timerData.docs.forEach(doc => {
            loadResults(doc);
        });
    });
    

function loadResults(doc) {
     // creating elements of the times results note 

         const resultNoteWrapper = document.createElement('div');
         resultNoteWrapper.classList.add('show-results-note', 'rounded-lg', 'shadow-2xl');
         resultsBoardArea.appendChild(resultNoteWrapper);
     
         const resultNameWrapper = document.createElement('div');
         resultNameWrapper.classList.add('show-result-name');
         resultNoteWrapper.appendChild(resultNameWrapper)
     
         const resultHeading = document.createElement('h2');
         resultHeading.setAttribute('data-id', doc.id);
         resultHeading.textContent = doc.data().name;
         resultNameWrapper.appendChild(resultHeading);
     
         const arrowElement = document.createElement('p');
         arrowElement.innerHTML = '<i class="fas fa-chevron-down">';
         resultNameWrapper.appendChild(arrowElement);
     
         const ulElement = document.createElement('ul')
         ulElement.classList.add('show-result-body');
         resultNoteWrapper.appendChild(ulElement);
         
         for (let i = 0;  i < doc.length; i++) {
             const liItem = document.createElement('li');
             liItem.setAttribute('data-id', id);
             liItem.classList.add('result-item');
             liItem.textContent = doc.data().times;
             ulElement.appendChild(liItem);
         
             console.log(liIte.textContent)
        };
    
        addAccordionFeature();
}


function displaySavedTimerResults(event) {
    event.preventDefault();
    
    loadResults()
    
    saveTimerResults()
    
    inputElement.value = '';
    form.style.display = 'none';
    resultNoteWrapper.style.display = 'inline-block';
    lastTimesList = [];
};

function hideForm() {
        form.style.display = 'none';
};

function showForm() {
    form.style.display = 'flex';
};


startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
pauseBtn.addEventListener('click', pauseTimer);
nextBtn.addEventListener('click', displayNextResult);
saveBtn.addEventListener('click', showForm);
form.addEventListener('submit', displaySavedTimerResults);
cancelBtn.addEventListener('click', hideForm);