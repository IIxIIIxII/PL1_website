// Phone Checker
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

//+996550644772
const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

if (phoneButton) {
    phoneButton.addEventListener('click', () => {
        if (reqExp.test(phoneInput.value)) {
            phoneSpan.innerHTML = 'Этот номер существует';
            phoneSpan.style.color = 'green';
        } else {
            phoneSpan.innerHTML = 'Этот номер не существует';
            phoneSpan.style.color = 'red';
        }
    });
}

// TAB SLIDER
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents = document.querySelector('.tab_content_items');

if (tabsItemsParents) {
    const hideTabsContentCards = () => {
        tabsContentCards.forEach((tabsContentCard) => {
            tabsContentCard.style.display = 'none'
        })
        tabsItems.forEach((tabItem) => {
            tabItem.classList.remove('tab_content_item_active')
        })
    }

    const showTabsContentCards = (indexElement = 0) => {
        tabsContentCards[indexElement].style.display = 'block';
        tabsItems[indexElement].classList.add('tab_content_item_active')
    }

    hideTabsContentCards();
    showTabsContentCards();

    let curretIndex = 0;
    let intervalId;

    const startAutoSlider = () => {
        intervalId = setInterval(() => {
            hideTabsContentCards();
            showTabsContentCards(curretIndex);
            curretIndex = (curretIndex + 1) % tabsItems.length;
        }, 2000);
    }

    startAutoSlider();

    tabsItemsParents.onclick = (event) => {
        clearInterval(intervalId);
        if (event.target.classList.contains('tab_content_item')) {
            tabsItems.forEach((tabItem, tabItemIndex) => {
                if (event.target === tabItem) {
                    hideTabsContentCards();
                    showTabsContentCards(tabItemIndex);
                    curretIndex = tabItemIndex;
                    startAutoSlider();
                }
            })
        }
    }
}

// CONVERTER
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

if (somInput && usdInput && eurInput) {
    const converter = (element, target1, target2, currentType) => {
        element.addEventListener('input', async () => {
            try {
                const response = await fetch('../data/converter.json');
                if (!response.ok) throw new Error('Не удалось загрузить данные');

                const data = await response.json();
                const value = parseFloat(element.value);

                if (!element.value || isNaN(value)) {
                    target1.value = '';
                    target2.value = '';
                    return;
                }

                switch(currentType) {
                    case 'som':
                        target1.value = (value / data.usd).toFixed(2);
                        target2.value = (value / data.eur).toFixed(2);
                        break;
                    case 'usd':
                        target1.value = (value * data.usd).toFixed(2);
                        target2.value = ((value * data.usd) / data.eur).toFixed(2);
                        break;
                    case 'eur':
                        target1.value = (value * data.eur).toFixed(2);
                        target2.value = ((value * data.eur) / data.usd).toFixed(2);
                        break;
                }
            } catch (error) {
                console.error(error);
            }
        });
    };

    converter(somInput, usdInput, eurInput, 'som');
    converter(usdInput, somInput, eurInput, 'usd');
    converter(eurInput, somInput, usdInput, 'eur');
}

// Card Switcher
const card = document.querySelector('.card');
const btnPrev = document.querySelector('#btn-prev');
const btnNext = document.querySelector('#btn-next');

if (card && btnPrev && btnNext) {
    const cardsData = [
        {
            image: 'https://i.ytimg.com/vi/sPnoZbnRPdU/maxresdefault.jpg',
            title: 'Молчанка',
            description: 'Мой мейн скин'
        },
        {
            image: 'https://game-tournaments.com/media/news/n11846.jpeg',
            title: 'Мидас',
            description: 'Лучший мужской скин'
        }
    ];

    let currentCardIndex = 0;

    function updateCard() {
        const currentCard = cardsData[currentCardIndex];
        card.innerHTML = `
            <div class="card_image">
                <img src="${currentCard.image}" alt="${currentCard.title}">
            </div>
            <div class="card_content">
                <h4>${currentCard.title}</h4>
                <p>${currentCard.description}</p>
            </div>
        `;
    }

    btnNext.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % cardsData.length;
        updateCard();
    });

    btnPrev.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + cardsData.length) % cardsData.length;
        updateCard();
    });

    updateCard();
}

// WEATHER APP
const cityInput = document.querySelector('.cityName');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');

if (cityInput && cityElement && tempElement) {
    // Заглушка для тестирования (без API ключа)
    async function getWeather(cityName) {
        // Имитация задержки API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockData = {
            name: cityName,
            sys: { country: 'KG' },
            main: { temp: Math.random() * 30 - 5 },
            weather: [{ description: 'солнечно' }]
        };
        
        return mockData;
    }

    function displayWeather(data) {
        if (!data) {
            cityElement.textContent = 'Город не найден';
            tempElement.textContent = '';
            return;
        }
        
        cityElement.textContent = `${data.name}, ${data.sys.country}`;
        tempElement.textContent = `${Math.round(data.main.temp)}°C, ${data.weather[0].description}`;
        
        const temp = data.main.temp;
        if (temp < 0) {
            tempElement.style.color = '#4A90E2';
        } else if (temp > 25) {
            tempElement.style.color = '#FF6B6B';
        } else {
            tempElement.style.color = '#4CAF50';
        }
    }

    cityInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                const weatherData = await getWeather(city);
                displayWeather(weatherData);
                cityInput.value = '';
            }
        }
    });

    // Загрузка погоды по умолчанию
    window.addEventListener('load', async () => {
        const defaultWeather = await getWeather('Bishkek');
        displayWeather(defaultWeather);
    });
}