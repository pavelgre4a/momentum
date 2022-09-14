// Show current time and date

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetingBlock = document.querySelector('.greeting');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let randomBgNum;

function showTimeAndDate() {
    const tempDate = new Date();
    const currentTime = tempDate.toLocaleTimeString();
    const options = {weekday: 'long', month: 'long', day: '2-digit'};
    const currentDate = tempDate.toLocaleDateString('en-Us', options);

    time.textContent = currentTime;
    date.textContent = currentDate;
    showGreeting();
}
showTimeAndDate();

setInterval(showTimeAndDate, 1000);


// Show and save greeting

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay},`;
    
    greetingBlock.textContent = greetingText;
}

function getTimeOfDay() {
    const tempDate = new Date();
    const hours = tempDate.getHours();

    if (hours >= 0 && hours < 6) {
        return 'night';
    } else if (hours >= 6 && hours < 12) {
        return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'day';
    } else if (hours >= 18 && hours < 24) {
        return 'evening';
    }
}

const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);


// Background random image slider

function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomBgNum = (Math.floor(Math.random() * (max - min + 1)) + min);
}
getRandomNum('1', '20');

function setBg() {
    const timeOfDay = getTimeOfDay();
    let bgNum = randomBgNum.toString().padStart(2, '0');

    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {
        body.style.background = 'none';
        body.style.backgroundImage = `url(${img.src})`;
    }
}
setBg();

function getSildeNext() {
    randomBgNum += 1;

    if (randomBgNum > 20) {
        randomBgNum = 1;
    }

    setBg();
}
slideNext.addEventListener('click', getSildeNext);

function getSildePrev() {
    randomBgNum -= 1;

    if (randomBgNum < 1) {
        randomBgNum = 20;
    }

    setBg();
}
slidePrev.addEventListener('click', getSildePrev);


// Show weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

city.value = 'Minsk';

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=f9a4ac1105e368cae44f07c5db52c935&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}
getWeather()
city.addEventListener('change', getWeather);

function setCityLocalStorage() {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setCityLocalStorage);

function getCityLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getCityLocalStorage);


// Show quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let randomQuoteNum;

function getRandomQuoteNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    randomQuoteNum = (Math.floor(Math.random() * (max - min + 1)) + min);
}

async function getQuotes() {
    const quotes = '/momentum/assets/json_data/data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    getRandomQuoteNum('0', '9');
    console.log(randomQuoteNum);

    quote.textContent = data[randomQuoteNum]['text'];
    author.textContent = data[randomQuoteNum]['author'];

}
getQuotes();

changeQuote.addEventListener('click', getQuotes);






