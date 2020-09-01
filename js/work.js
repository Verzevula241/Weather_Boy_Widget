
const imageWeather = document.querySelector(".weather_img");
const valueWeather = document.querySelector(".weather_value p");
const descriptionWeather = document.querySelector(".weather_description p");
const locationWeather = document.querySelector(".weather_location p");
const Today = document.querySelector(".DayDate p");
const humWeather = document.querySelector(".hum span");
const feelWeather = document.querySelector(".feel span");
const windWeather = document.querySelector(".wind span");
const notification = document.querySelector(".notification")
const cityImg = document.querySelector(".container");
const weather = {};
var newimg=document.createElement("img");



window.addEventListener("load", () => {getWeather();});
$(document).ready(function() {
    setInterval(getWeather, 600000);
});


function getWeather(){
   $.ajax({
    url:"https://api.openweathermap.org/data/2.5/weather?q=Vladimir,ru&appid=f1982104117e5d9c8615c2118a29c226&units=metric&lang=ru",
    type:"get",
    timeout: 5000,
    success: function(data){
        weather.temperature = Math.round(data.main.temp);
        weather.feel = Math.round(data.main.feels_like);
        weather.speed = Math.round(data.wind.speed);
        weather.humidity = Math.round(data.main.humidity);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.lon = data.coord.lon;
        weather.lat = data.coord.lat;
        newimg.setAttribute("src","http://static-api.maps.sputnik.ru/v1/?width=640&height=640&z=15&clng="+weather.lon+"&clat="+weather.lat+"&apikey=5032f91e8da6431d8605-f9c0c9a00357")
        displayWeather();
    },
    error: function(error){
        showError(error);
        setTimeout(hideError, 10000)
    }
    
});
}

function changeBackground(color) {
    document.body.style.background = color;
 }

function displayWeather(){
    imageWeather.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`;
    valueWeather.innerHTML = `${weather.temperature}°<span>C</span>`;
    descriptionWeather.innerHTML = weather.description;
    humWeather.innerHTML = weather.humidity;
    feelWeather.innerHTML = weather.feel;
    windWeather.innerHTML = weather.speed;
    locationWeather.innerHTML = `${weather.city}`;
    cityImg.style.backgroundImage = "url('"+newimg.src+"')";
    Today.innerHTML = Day_of_Week();
    var lastChar = weather.iconId[weather.iconId.length -1];
    switch(lastChar){
        case 'd':{
            changeBackground('linear-gradient(to right, #f5f7fa, #c3cfe2)');
            break;
        }
        case 'n':{
            changeBackground('linear-gradient(to right, #232526, #414345)');
            break;
        }
    }
    
}

function Day_of_Week() {
    let days = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
    var d = new Date();
    var n = d.getDay();
    var day = days[n-1];
    return day;
  }

function showError(error){
    notification.style.display = "block";
    notification.innerHTML = `<p> ${error.statusText} </p>`;
}
function hideError(){
    notification.style.display = "none";
}

