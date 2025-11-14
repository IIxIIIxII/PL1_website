const input = document.getElementById('gmail_input');
const button = document.getElementById('gmail_button');
const result = document.getElementById('gmail_result');

const gmailRegExp = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


button.addEventListener('click', ()=>{
    const value = input.value.trim();
    if (gmailRegExp.test(value)){
        result.textContent = 'Почта верна';
        result.style.color = 'green';
    }else{
         result.textContent = 'Почта не верна';
         result.style.color = 'red';
    }
});

let stopwatchInterval;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let currentSpeed = 1;

const minutesElement = document.getElementById('minutesS');
const secondsElement = document.getElementById('secondsS');
const mlSecondsElement = document.getElementById('ml-secondsS');
const speedValueElement = document.getElementById('speedValue');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const speedMinusButton = document.getElementById('speedMinus');
const speedPlusButton = document.getElementById('speedPlus');

function updateDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const mlSeconds = Math.floor((elapsedTime % 1000) / 10);

    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    mlSecondsElement.textContent = mlSeconds.toString().padStart(2, '0');
}

function updateSpeedDisplay() {
    speedValueElement.textContent = `${currentSpeed}x`;
    
    // Убираем предыдущие классы скорости
    document.querySelector('.inner_stopwatch').classList.remove('speed-fast', 'speed-slow');
    
    // Добавляем соответствующий класс для визуального отображения скорости
    if (currentSpeed > 1) {
        document.querySelector('.inner_stopwatch').classList.add('speed-fast');
    } else if (currentSpeed < 1) {
        document.querySelector('.inner_stopwatch').classList.add('speed-slow');
    }
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 100 / currentSpeed); // Изменяем интервал в зависимости от скорости
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(stopwatchInterval);
    }
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    updateDisplay();
    currentSpeed = 1;
    updateSpeedDisplay();
}

function changeSpeed(direction) {
    if (direction === 'plus') {
        if (currentSpeed < 5) {
            currentSpeed += 0.5;
        }
    } else if (direction === 'minus') {
        if (currentSpeed > 0.5) {
            currentSpeed -= 0.5;
        }
    }
    
    updateSpeedDisplay();
    
    // Если секундомер запущен, перезапускаем с новой скоростью
    if (isRunning) {
        stopStopwatch();
        startStopwatch();
    }
}

// Event Listeners
startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', stopStopwatch);
resetButton.addEventListener('click', resetStopwatch);

speedPlusButton.addEventListener('click', () => changeSpeed('plus'));
speedMinusButton.addEventListener('click', () => changeSpeed('minus'));

// Инициализация
updateDisplay();
updateSpeedDisplay();