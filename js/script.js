// Translation feature

import appTranslation from "./appTranslation.js";
const russianBtn = document.querySelector(".languages-item-ru");
const englishBtn = document.querySelector(".languages-item-en");
let defaultLang = "en";

function setRussianLang() {
  russianBtn.classList.add('languages-item-active');
  englishBtn.classList.remove('languages-item-active');
  defaultLang = 'ru';
  setTimeout(getWeather, 1000, defaultLang);
}
russianBtn.addEventListener('click', setRussianLang);

function setEnglishLang() {
  englishBtn.classList.add('languages-item-active');
  russianBtn.classList.remove('languages-item-active');
  defaultLang = 'en';
  setTimeout(getWeather, 1000, defaultLang);
}
englishBtn.addEventListener('click', setEnglishLang);

// Show current time and date

const time = document.querySelector(".time");

function showTime(lang) {
  const actualTime = new Date();
  const currentTime = actualTime.toLocaleTimeString(appTranslation.timeAndDate[lang].time.locales);

  time.textContent = currentTime;
  setTimeout(showTime, 1000, defaultLang);
}
showTime(defaultLang);

const date = document.querySelector(".date");

function showDate(lang) {
  const actualDate = new Date();
  const options = { weekday: "long", month: "long", day: "2-digit" };
  const currentDate = actualDate.toLocaleDateString(appTranslation.timeAndDate[lang].date.locales, options);

  date.textContent = currentDate;
  setTimeout(showDate, 1000, defaultLang);
}
showDate(defaultLang);

// Show and save greeting

const greeting = document.querySelector(".greeting");

function showGreeting(lang) {
  const timeOfDay = getTimeOfDay(lang);
  const greetingText = `${appTranslation.greeting[lang]} ${timeOfDay},`;

  greeting.textContent = greetingText;
  setTimeout(showGreeting, 1000, defaultLang);
}
showGreeting(defaultLang);

function getTimeOfDay(lang) {
  const tempDate = new Date();
  const hours = tempDate.getHours();

  if (hours >= 0 && hours < 6) {
    return `${appTranslation.dayTimes[lang].night}`;
  } else if (hours >= 6 && hours < 12) {
    return `${appTranslation.dayTimes[lang].morning}`;
  } else if (hours >= 12 && hours < 18) {
    return `${appTranslation.dayTimes[lang].afternoon}`;
  } else if (hours >= 18 && hours < 24) {
    return `${appTranslation.dayTimes[lang].evening}`;
  }
}

const name = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

// Background random image slider

const body = document.querySelector("body");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
let randomBgNum;

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  randomBgNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomNum("1", "20");

function setBg() {
  const timeOfDay = getTimeOfDay('en');
  let bgNum = randomBgNum.toString().padStart(2, "0");

  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.addEventListener("load", () => {
    body.style.background = "none";
    body.style.backgroundImage = `url(${img.src})`;
  });
}
setBg();

function getSildeNext() {
  randomBgNum += 1;

  if (randomBgNum > 20) {
    randomBgNum = 1;
  }

  setBg();
}
slideNext.addEventListener("click", getSildeNext);

function getSildePrev() {
  randomBgNum -= 1;

  if (randomBgNum < 1) {
    randomBgNum = 20;
  }

  setBg();
}
slidePrev.addEventListener("click", getSildePrev);

// Show weather

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const city = document.querySelector(".city");

async function getWeather(lang) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=f9a4ac1105e368cae44f07c5db52c935&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
city.addEventListener("change", () => getWeather(defaultLang));

function setCityLocalStorage() {
  localStorage.setItem("city", city.value);
}
window.addEventListener("beforeunload", setCityLocalStorage);

function getCityLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    getWeather(defaultLang);
  }
}
window.addEventListener("load", getCityLocalStorage);

// Show quotes

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const changeQuote = document.querySelector(".change-quote");

async function getQuote() {
  const url = 'https://favqs.com/api/qotd';
  const res = await fetch(url);
  const data = await res.json();

  quote.textContent = data.quote.body;
  author.textContent = data.quote.author;
}
getQuote();

changeQuote.addEventListener("click", getQuote);

// Audioplayer widget

import playList from "./playList.js";

let audioNum;
const audioToggleBtn = document.querySelector(".play");
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");

function getRandomAudioNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  audioNum = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomAudioNum(0, playList.length);

const audio = new Audio();
let isPlay = false;

function playAudio() {
  audio.src = `${playList[audioNum].src}`;

  if (!isPlay) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
}
audioToggleBtn.addEventListener("click", playAudio);

function toggleAudioBtn() {
  if (!isPlay) {
    audioToggleBtn.classList.remove("pause");
  } else {
    audioToggleBtn.classList.add("pause");
  }
}
audioToggleBtn.addEventListener("click", toggleAudioBtn);

function playNext() {
  audioNum += 1;

  if (audioNum >= playList.length) {
    audioNum = 0;
  }
  isPlay = false;
  playAudio();
}
playNextBtn.addEventListener("click", playNext);
playNextBtn.addEventListener("click", toggleAudioBtn);

function playPrev() {
  audioNum -= 1;

  if (audioNum < 0) {
    audioNum = playList.length - 1;
  }
  isPlay = false;
  playAudio();
}
playPrevBtn.addEventListener("click", playPrev);
playPrevBtn.addEventListener("click", toggleAudioBtn);

const playListContainer = document.querySelector(".play-list");

playList.forEach((elem, index) => {
  const li = document.createElement("li");
  playListContainer.append(li);
  li.classList.add("play-item");
  li.textContent = playList[index].title;
});
