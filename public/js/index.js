const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});



const timerElement = document.querySelector('#timer');
const timerTime = timerElement.querySelector('.time');
const timerStartBtns = timerElement.querySelectorAll('.timer__start');
const timerPauseBtns = timerElement.querySelectorAll('.timer__pause');
const timerStopBtns = timerElement.querySelectorAll('.timer__stop');

const timer = {
    startTime: false,
    timeout: false,
    start: () => {
        timer.time = new Date();
        timerTime.textContent = timer.time;
        timer.timeout = setTimeout(timer.start, 500);
    },
    stop: () => {
        clearTimeout(timer.timeout);
        timerTime.textContent = '00:00';
    },
    pause: () => {
        clearTimeout(timer.timeout);
        timerTime.textContent += ' PAUSED';
    }
}

// przypisanie obsługi zdarzeń do przycisków
timerStartBtns.forEach(button => button.addEventListener('click', () => {
    timer.start();
    console.log('start');
}));

timerPauseBtns.forEach(button => button.addEventListener('click', () => {
    timer.pause();
    console.log('pause');
}));

timerStopBtns.forEach(button => button.addEventListener('click', () => {
    timer.stop();
    console.log('stop');
}));

