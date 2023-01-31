let searchBtn = document.querySelector('#search-button')
let input = document.getElementById('search-input')
let forecast = document.getElementById('forecast-title')
let historyDiv = document.querySelector('#history')
let cityDiv = document.querySelector('.input-group')
let citiesContainer = document.querySelector('#cities-container')
let cityList = []
let cityBtn
let geoCodeURL = "https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=7fd780c3c987cc66a03206e9736fa65e&celsius"

displayButtonsFromStorage()

function render(cityList) {
 citiesContainer.innerHTML = ''
 for (let i = 0; i < cityList.length; i++) {
  let city = cityList[i]
  cityBtn = document.createElement('button')
  cityBtn.innerHTML = city
  citiesContainer.prepend(cityBtn)
 }
}


function renderWeatherData(cityName) {
 let searchCity = input.value
 fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=5&appid=7fd780c3c987cc66a03206e9736fa65e&units=metric`)
    .then(response => response.json())
    .then(data => {
      let city = data[0]
      lat = city.lat
      lon = city.lon

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7fd780c3c987cc66a03206e9736fa65e&units=metric`)
    })
    .then(response => response.json())
    .then(data => {
     
      //console.log(data);
       //console.log(data.list[0].dt);
       //let day = moment(data.list[0].dt, 'X').format("DD/MM/YYYY HH:mm:ss")
       let day = moment(data.list[0].dt, 'X').format("DD/MM/YYYY") 
       let iconURL = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
       //console.log(day);
       
      let currentForecast = document.querySelector('#current-forecast').innerHTML = `
        <h1>${data.city.name} <span>(${day})<img src="${iconURL}"/></span></h1>
                <p>Temp: ${(data.list[0].main.temp).toFixed()}°C</p>
             
                <p>Wind: ${data.list[0].wind.speed} KPH</p>
                <p>Humidity: ${data.list[0].main.humidity} %</p>
        `
       $("#current-forecast").css({"border":"2px solid darkgray","padding":"10px"})

       forecast.innerHTML = '5-Day Forecast:'
   
    let dayOne = moment(data.list[7].dt, 'X').format("DD/MM/YYYY")
    let iconOne = `https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@2x.png`;
    let forecastOne = document.querySelector('#forecast-one').innerHTML = `
    <h4> <span>${dayOne}</span></h4>
                <img src="${iconOne}"/>
                <p>Temp: ${(data.list[7].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[7].wind.speed} KPH</p>
                <p>Humidity: ${data.list[7].main.humidity} %</p>
    
    `
  $("#forecast-one").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})

        let dayTwo = moment(data.list[13].dt, 'X').format("DD/MM/YYYY")
        let iconTwo = `https://openweathermap.org/img/wn/${data.list[13].weather[0].icon}@2x.png`;
    let forecastTwo = document.querySelector('#forecast-two').innerHTML = `
    <h4> <span>${dayTwo}</span></h4>
                <img src="${iconTwo}"/>
                <p>Temp: ${(data.list[13].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[13].wind.speed} KPH</p>
                <p>Humidity: ${data.list[13].main.humidity} %</p>
    
    `
     $("#forecast-two").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})

        let dayThree = moment(data.list[21].dt, 'X').format("DD/MM/YYYY")
         let iconThree = `https://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@2x.png`;
    let forecastThree = document.querySelector('#forecast-three').innerHTML = `
    <h4> <span>${dayThree}</span></h4>
                <img src="${iconThree}"/>
                <p>Temp: ${(data.list[21].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[21].wind.speed} KPH</p>
                <p>Humidity: ${data.list[21].main.humidity} %</p>
    
    `
      $("#forecast-three").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})

        let dayFour = moment(data.list[29].dt, 'X').format("DD/MM/YYYY")
        let iconFour = `https://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@2x.png`;
    let forecastFour = document.querySelector('#forecast-four').innerHTML = `
    <h4> <span>${dayFour}</span></h4>
    <img src="${iconFour}"/>
                <p>Temp: ${(data.list[29].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[29].wind.speed} KPH</p>
                <p>Humidity: ${data.list[29].main.humidity} %</p>
    
    `
      $("#forecast-four").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})
   
        let dayFive = moment(data.list[37].dt, 'X').format("DD/MM/YYYY")
        let iconFive = `https://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@2x.png`;
    let forecastFive = document.querySelector('#forecast-five').innerHTML = `
    <h4> <span>${dayFive}</span></h4>
    <img src="${iconFive}"/>
                <p>Temp: ${(data.list[37].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[37].wind.speed} KPH</p>
                <p>Humidity: ${data.list[37].main.humidity} %</p>
    
    `
      $("#forecast-five").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})
     })
     
}



function storePlaces() {
 localStorage.setItem('data', JSON.stringify(cityList))
}


searchBtn.addEventListener('click',function(e) {
 e.preventDefault()
 let searchCity = input.value
 renderWeatherData()

 if(searchCity !== '') {
   if(!cityList.includes(searchCity)) {
     cityList.push(searchCity)
 }
 //cityList.push(searchCity)
 
storePlaces() 
render(cityList)
 }
})


citiesContainer.addEventListener('click',function(e) {
 e.preventDefault()
 console.log(e.target);

 if(e.target.matches('button')) {
  console.log(e.target);
  let cityName = e.target.textContent
  renderWeatherData(cityName)
 }
})

function displayButtonsFromStorage() {
 storedCities = JSON.parse(localStorage.getItem('data'))
 console.log(storedCities);
  if(storedCities !== null) {
   cityList = storedCities
   console.log(cityList);
  }
 render(cityList)
}