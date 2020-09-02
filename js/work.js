
const imageWeather = document.querySelector(".weather_img");//картинка состояния погоды
const valueWeather = document.querySelector(".weather_value p");//температура
const descriptionWeather = document.querySelector(".weather_description p");//описание погоды
const locationWeather = document.querySelector(".weather_location p");//локация (город)
const Today = document.querySelector(".DayDate p");//день недели
const humWeather = document.querySelector(".hum span");//значение влажности
const feelWeather = document.querySelector(".feel span");//значение температуры по ощущению
const windWeather = document.querySelector(".wind span");//значение скорости ветра
const notification = document.querySelector(".notification");//уведомление
const cityImg = document.querySelector(".container");//основной контейнер
const weather = {};//объект для храниения значений
var newimg=document.createElement("img");//пустая картинка



window.addEventListener("load", () => {getWeather();});

$(document).ready(function() {
    setInterval(getWeather, 600000);
});

//функция для обращения к API и заполнения объекта
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
        //newimg.setAttribute("src","http://static-api.maps.sputnik.ru/v1/?width=640&height=640&z=15&clng="+weather.lon+"&clat="+weather.lat+"&apikey=5032f91e8da6431d8605-f9c0c9a00357")
        displayWeather();
    },
    error: function(error){
        showError(error);
        setTimeout(hideError, 10000)
    }
    
});
}

function imgMap(img,lon,lat){
    img.setAttribute("src","http://static-api.maps.sputnik.ru/v1/?width=640&height=640&z=15&clng="+lon+"&clat="+lat+"&apikey=5032f91e8da6431d8605-f9c0c9a00357");
    return img;
}
//функция смены цвета заднего фона 
function changeBackground(color) {
    document.body.style.background = color;
 }
//функция заполнения эментовданными
function displayWeather(){
    imageWeather.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.iconId}@2x.png"/>`;
    valueWeather.innerHTML = `${weather.temperature}°<span>C</span>`;
    descriptionWeather.innerHTML = weather.description;
    humWeather.innerHTML = weather.humidity;
    feelWeather.innerHTML = weather.feel;
    windWeather.innerHTML = weather.speed;
    locationWeather.innerHTML = `${weather.city}`;
    cityImg.style.backgroundImage = "url('"+imgMap(newimg,weather.lon,weather.lat).src+"')";
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

//функция для поиска дня недели
function Day_of_Week() {
    let days = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"];
    var d = new Date();
    var n = d.getDay();
    var day = days[n-1];
    return day;
  }
//функция отображения сообщения об ошибке
function showError(error){
    notification.style.display = "block";
    notification.innerHTML = `<p> ${error.statusText} </p>`;
}
//функция скрывающая ошибку
function hideError(){
    notification.style.display = "none";
}

