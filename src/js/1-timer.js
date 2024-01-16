import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const day = document.querySelector('span[data-days]');
const hour = document.querySelector('span[data-hours]');
const minute = document.querySelector('span[data-minutes]');
const second = document.querySelector('span[data-seconds]');

btnStart.disabled = true;
let userSelectedDate = '';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
        iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
    });
    
    btnStart.disabled = true;
    } else {
        userSelectedDate = selectedDates[0];
        btnStart.disabled = false;
        iziToast.success({
        title: 'OK',
        message: 'You can press "Start"!',
    });
    }
},
};

flatpickr(input, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', startTimer);

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function startTimer() {
    const selectedDateTime = userSelectedDate.getTime(); 
    const intervalId = setInterval(() => {
    const currentDate = new Date(); 
    const diff = selectedDateTime - currentDate;
    const { days, hours, minutes, seconds } = convertMs(diff);

    if (diff <= 0) {
        clearInterval(intervalId);

    } else {
        day.textContent = addLeadingZero(days);
        hour.textContent = addLeadingZero(hours);
        minute.textContent = addLeadingZero(minutes);
        second.textContent = addLeadingZero(seconds);
    }
}, 1000);
}