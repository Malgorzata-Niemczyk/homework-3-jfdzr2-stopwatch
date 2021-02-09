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

let lastTimesList = []; // to add last results to the ul list
let timerDataArr = []; // to save objects into localStorage

let cardID = 0;

stopBtn.style.display = 'none';
saveBtn.style.display = 'none';

/********Getting data from Firebase***********/
firebase.firestore().collection('timer-results').onSnapshot(results => {
    results.docs.forEach(doc => {
        renderTimerResults(doc)
    });
});

function renderTimerResults(results) {
    const resultNoteWrapper = document.createElement('div');
    resultNoteWrapper.classList.add('show-results-note', 'rounded-lg', 'shadow-2xl');
    resultsBoardArea.appendChild(resultNoteWrapper);

    const resultNameWrapper = document.createElement('div');
    resultNameWrapper.classList.add('show-result-name');
    resultNameWrapper.setAttribute('data-id', results.id)
    resultNoteWrapper.appendChild(resultNameWrapper)

    const resultHeading = document.createElement('h2');
    resultHeading.innerHTML = results.data().name;
    resultNameWrapper.appendChild(resultHeading);

    const arrowElement = document.createElement('p');
    arrowElement.innerHTML = '<i class="fas fa-chevron-down">';
    resultNameWrapper.appendChild(arrowElement);

    const ulElement = document.createElement('ul')
    ulElement.classList.add('show-result-body');
    resultNoteWrapper.appendChild(ulElement);

    for (let i = 0;  i < results.data().time.length; i++) {
        const liItem = document.createElement('li');
        liItem.classList.add('result-item');
        liItem.innerHTML = results.data().time[i];
        ulElement.appendChild(liItem);
    }; 

    let currentHeadings = document.querySelectorAll('.show-result-name');
    let lastHeading = currentHeadings[currentHeadings.length - 1];

    renderAccordionFeature(lastHeading);
};
/*******************/

function renderAccordionFeature(item) {
    item.addEventListener('click', () => {

        item.classList.toggle('active');
    
            const resultBodyElements = item.nextElementSibling;
    
            if (item.classList.contains('active')) {
                resultBodyElements.style.maxHeight = `${resultBodyElements.scrollHeight}px`;
            } else {
                resultBodyElements.style.maxHeight = 0;
            }
    });
};


// Starting the timer
function startTimer() {
    if (timerState === false) {
        timerState = setInterval(formatTimer, 10);
        stopBtn.style.display = 'block'
        saveBtn.style.display = 'none';
        startBtn.style.display = 'none';
        nextBtn.style.display = 'block'
        pauseBtn.textContent = 'Pause';
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

    displayOneResult();

    timerDisplay.innerHTML = '00:00:00';
    saveBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    startBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
};

function pauseTimer() {
    if (timerState === false) /*clicked to continue running the timer*/ {
        timerState = setInterval(formatTimer, 10);
        stopBtn.style.display = 'block';
        nextBtn.style.display = 'block'; 
        saveBtn.style.display = 'none';
        pauseBtn.textContent = 'Pause';
    } else /*clicked to pause the timer*/{
        clearInterval(timerState);
        timerState = false;
        stopBtn.style.display = 'none';
        saveBtn.style.display = 'none';
        startBtn.style.display = 'block';
        nextBtn.style.display = 'none'; 
        pauseBtn.textContent = 'Resume';
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
    pauseBtn.textContent = 'Pause';

    lastTimesList = [];

    // setting up the initial display of the buttons after pressing the reset button either when the timer is running or when the timer is stopped
    if (timerState === true || timerState === false) {
        startBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        stopBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        saveBtn.style.display = 'none';
    };
}

function displayOneResult() {
    if (timerState === false) {
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

function createSavedResultsList(event) {
    event.preventDefault();

    let resultItem = {
        name: inputElement.value,
        time: lastTimesList,
    }

    // creating elements of the times results note 
    const resultNoteWrapper = document.createElement('div');
    resultNoteWrapper.classList.add('show-results-note', 'rounded-lg', 'shadow-2xl');
    resultsBoardArea.appendChild(resultNoteWrapper);

    const resultNameWrapper = document.createElement('div');
    resultNameWrapper.classList.add('show-result-name');
    resultNoteWrapper.appendChild(resultNameWrapper)

    const resultHeading = document.createElement('h2');
    resultHeading.innerHTML = resultItem.name;
    resultNameWrapper.appendChild(resultHeading);

    const arrowElement = document.createElement('p');
    arrowElement.innerHTML = '<i class="fas fa-chevron-down">';
    resultNameWrapper.appendChild(arrowElement);

    const ulElement = document.createElement('ul')
    ulElement.classList.add('show-result-body');
    resultNoteWrapper.appendChild(ulElement);
    
    for (let i = 0;  i < resultItem.time.length; i++) {
        const liItem = document.createElement('li');
        liItem.classList.add('result-item');
        liItem.innerHTML = resultItem.time[i];
        ulElement.appendChild(liItem);
    }; 


    // get all the elements with the result name heading to apply the accordion feature on them
    let currentHeadings = document.querySelectorAll('.show-result-name');
    let lastHeading = currentHeadings[currentHeadings.length - 1];

    renderAccordionFeature(lastHeading);

    // saving timer results to localStorage
    timerDataArr.push(resultItem);
    localStorage.setItem('myResults', JSON.stringify(timerDataArr))
    
    // clearing the timer display and the other timer results upon clicking the save button
    min = 0;
    sec = 0;
    milisec = 0;
    timerDisplay.innerHTML = (min < 10 ? `0${min}` : min) + ":" + (sec < 10 ? `0${sec}` : sec) + ":" + (milisec < 10 ? `0${milisec}` : milisec);
    nextResultDisplay.innerHTML = '';

    inputElement.value = '';
    form.style.display = 'none';
    resultNoteWrapper.style.display = 'inline-block';
    lastTimesList = [];

    // setting up the initial display of the buttons after adding a saved result
    startBtn.style.display = 'block';
    stopBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    pauseBtn.style.display = 'block';
    saveBtn.style.display = 'none';
};

function hideForm() {
        form.style.display = 'none';
        inputElement.value = '';
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
form.addEventListener('submit', createSavedResultsList);
cancelBtn.addEventListener('click', hideForm);