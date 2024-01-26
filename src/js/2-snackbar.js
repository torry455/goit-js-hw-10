import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = Number(form.delay.value); 
    const state = form.state.value;
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then(value => {
            iziToast.show({
                message: `✅ Fulfilled promise in ${value}ms`,
                backgroundColor: '#59A10D',
                messageColor: '#fff',
                position: 'topCenter',
            });
        })
        .catch(error => {
            iziToast.show({
                message: `❌ Rejected promise in ${error}ms`,
                backgroundColor: '#EF4040',
                messageColor: '#fff',
                position: 'topCenter',
            });
        });
});