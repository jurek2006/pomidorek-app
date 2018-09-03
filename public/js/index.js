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
    setTime: 15,
    startTime: false,
    endTime: false,
    timeout: false,
    start: () => {
        console.log('Timer started');
        // wyliczenie czasu zakończenia timera
        timer.startTime = new Date();
        timer.endTime = new Date(timer.startTime.getTime() + timer.setTime * 1000);
        timer.step();
    },
    stop: () => {
        console.log('Timer stopped');
        clearTimeout(timer.timeout);
        timer.startTime = false;
        timer.endTime = false;
        timerTime.textContent = '00:00';
    },
    pause: () => {
        console.log('Timer paused');
        timer.setTime = timer.secondsToEnd();
        clearTimeout(timer.timeout);
        timerTime.textContent += ' PAUSED';
    },
    step: () => {
        // porównanie czasu aktualnego i czasu zakończenia timera
        const timeLeft = timer.secondsToEnd();
        if(timeLeft >= 0){
            timerTime.textContent = timeLeft;
            timer.timeout = setTimeout(timer.step, 500);
        } else {
            console.log('stopped');
        }
    },
    secondsToEnd: () => {
        return Math.ceil((timer.endTime - new Date()) / 1000);
    }
}

// przypisanie obsługi zdarzeń do przycisków
timerStartBtns.forEach(button => button.addEventListener('click', () => {
    timer.start(15);
}));

timerPauseBtns.forEach(button => button.addEventListener('click', () => {
    timer.pause();
}));

timerStopBtns.forEach(button => button.addEventListener('click', () => {
    timer.stop();
}));

