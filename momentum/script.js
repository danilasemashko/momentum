// DOM Elements
const time = document.getElementById('time'),
date = document.getElementById('date'),
 greeting = document.getElementById('greeting'),
 name = document.getElementById('name'),
 focus1 = document.getElementById('focus1');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const speed = document.querySelector('.speed');
const weatherDescription = document.querySelector('.weather-description');
const city = document.getElementById('city');
// если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// скопируйте код себе и запустите со своего компьютера
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');

// если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);



const base = 'https://raw.githubusercontent.com/irinainina/ready-projects/momentum/momentum/assets/images/';
let dayTime = ['night/', 'night/', 'night/', 'night/', 'night/','night/', 'morning/', 'morning/','morning/', 'morning/', 'morning/', 'morning/', 'day/', 'day/', 'day/', 'day/', 'day/', 'day/', 'evening/', 'evening/', 'evening/', 'evening/', 'evening/', 'evening/'];
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let today2 = new Date();
let i = today2.getHours();
let k = 0;
let n = 0;
doDayTime();
function doDayTime(){
  let max = 17;
  let min = 1;
  let rand = 0;
  for (k=0;k<24;k++){
     rand = min - 0.5 + Math.random() * (max - min + 1);
     rand = Math.round(rand);
     dayTime[k] = dayTime[k] + images[rand];
  }

}

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {      
    body.style.backgroundImage = `url(${src})`;
  }; 
}
function getImage() {
  const index = i % dayTime.length;
  const imageSrc = base + dayTime[index];
  viewBgImage(imageSrc);
  i++;
  btn2.disabled = true;
  setTimeout(function() { btn2.disabled = false }, 1000);
} 
const btn2 = document.querySelector('.btn2');
btn2.addEventListener('click', getImage);

 // show time
 function showTime() {
  let today = new Date(),
   hour = today.getHours(),
   min = today.getMinutes(),
   sec = today.getSeconds();


   // Output Time
   time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

   setTimeout(showTime, 1000);
 }

 // show date
function showDate() {
  let arr2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let todayDate = new Date (),
  datef = todayDate.getDate(),
  mouth = todayDate.getMonth();
  mouth = arr2[mouth];
  date.innerHTML = `${datef}<span> </span>${mouth}`;
}

 function addZero(n) {
  return(parseInt(n, 10) < 10 ? '0' : '') + n;
 }

// Set Background and Greetin
function setBgGreet(){
  let today = new Date(),
  hour = today.getHours();

  if(hour<6) {
    // Nigth
    document.body.style.backgroundImage = `url(${base}${dayTime[hour]})`;
    greeting.textContent = 'Good Nigth';
    document.body.style.color ='white';
  } else if(hour < 12) {
    document.body.style.backgroundImage = `url(${base}${dayTime[hour]})`;
    // Morning
    greeting.textContent = 'Good  Morning';
    document.body.style.color ='white';
  } else if(hour < 18) {
    document.body.style.backgroundImage = `url(${base}${dayTime[hour]})`;
    greeting.textContent = 'Good  Afternoon';
    document.body.style.color = 'black';
     // Afternoon
  } else {
    document.body.style.backgroundImage = `url(${base}${dayTime[hour]})`;
    document.body.style.color ='white';
    greeting.textContent = 'Good Evening';
    
    // Evening
  }
}

// Get Name
function getName(){
  if(localStorage.getItem('name') === null || localStorage.getItem('name') === ''){
    name.textContent = '[Enter Name]';
  } else{
    name.textContent = localStorage.getItem('name');
  }
}
// Set Name
function setName(e){
  if (e.type === 'focus'){
    name.textContent = '';
  }
  if(e.type === 'keypress'){
  // Make sure enter is pressed
  if (e.which == 13 || e.keyCode == 13){
    if (name.textContent ===''){
      getName();
    }else {
    localStorage.setItem('name', e.target.innerText);
   }
   name.blur();
  }
  }
}

function setFocus(e){
  if (e.type === 'focus'){
    focus1.textContent = ' ';
    return;
  }
  if(e.type === 'keypress'){
  // Make sure enter is pressed
  if (e.which == 13 || e.keyCode == 13){
    if(focus1.textContent === ' ' || focus1.textContent === ''){
      getFocus();
    }else{
      localStorage.setItem('focus1', e.target.innerText);
    }
     focus1.blur();
    } 
  }
}

// Get Focus
function getFocus(){
  if(localStorage.getItem('focus1') === null || localStorage.getItem('focus1') === ''){
    focus1.textContent = 'Enter Focus';
  } else{
    focus1.textContent = localStorage.getItem('focus1');
  }
}

// Set Focus
async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=8ce61da97afdb455390227231c7736df
&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  humidity.textContent = `Air humidity ${data.main.humidity}%`;
  speed.textContent = `Wind speed ${data.wind.speed}m/s`
}
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('focus', setName);
focus1.addEventListener('focus', setFocus);
focus1.addEventListener('keypress', setFocus);

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('focus', setCity);

function getCity(){
  if(localStorage.getItem('city') === null || localStorage.getItem('city') === ''){
    city.textContent = '[Enter City]';
  } else{
    city.textContent = localStorage.getItem('city');
  }
}
// Set Name
function setCity(event){
  if (event.type === 'focus'){
    city.textContent = ' ';
  }
  if(event.type === 'keypress'){
  // Make sure enter is pressed
  if (event.which == 13 || event.keyCode == 13){
    city.blur();
    getWeather();
    if (city.textContent ===''){
      getCity();
    }else {
    localStorage.setItem('city', event.target.innerText);
   }
   
  }
  }
}
 // Run
 showTime();
 showDate();
 setBgGreet();
 getName();
 getFocus();
  getCity();
 getWeather();

 