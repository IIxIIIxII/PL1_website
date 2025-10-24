const phoneInputRu = document.querySelector('#phone_input_ru');
const phoneButtonRu = document.querySelector('#phone_button_ru');
const phoneSpanRu = document.querySelector('#phone_result_ru');

const ruRegExp = /^\+7 \d{3} \d{3}-\d{2}-\d{2}$/;

phoneButtonRu.addEventListener('click', () => {
    if (ruRegExp.test(phoneInputRu.value)) {
        phoneSpanRu.innerHTML = 'Этот номер существует';
        phoneSpanRu.style.color = 'green';
    } else {
        phoneSpanRu.innerHTML = 'Этот номер не существует';
        phoneSpanRu.style.color = 'red';
    }
});

