const iinInput = document.getElementById('iin_input');
const iinButton = document.getElementById('iin_button');
const iinResult = document.getElementById('iin_result');

const iinRegExp = /^\d{14}$/;

iinButton.addEventListener('click', () => {
    if (iinRegExp.test(iinInput.value)) {
        iinResult.innerHTML = 'ИИН верен';
        iinResult.style.color = 'green';
    } else {
        iinResult.innerHTML = 'ИИН не верен';
        iinResult.style.color = 'red';
    }
});