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

// Create search history buttons
function historyButtons(cityList) {
 citiesContainer.innerHTML = ''
 for (let i = 0; i < cityList.length; i++) {
  let city = cityList[i]
  let firstL = city.slice(0,1).toUpperCase()
  let restL = city.slice(1)
  city = firstL + restL
  cityBtn = document.createElement('button')
  cityBtn.innerHTML = city
  citiesContainer.prepend(cityBtn)
 }
}

// Render the weather data
function renderWeatherData() {
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
     
       // Display the weather of a searched location    
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

       // Add title to the 5 day forecast
       forecast.innerHTML = '5-Day Forecast:'
   
       //Display forecast for the next 5 days
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

        let dayTwo = moment(data.list[15].dt, 'X').format("DD/MM/YYYY")
        let iconTwo = `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png`;
        let forecastTwo = document.querySelector('#forecast-two').innerHTML = `
                <h4> <span>${dayTwo}</span></h4>
                <img src="${iconTwo}"/>
                <p>Temp: ${(data.list[15].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[15].wind.speed} KPH</p>
                <p>Humidity: ${data.list[15].main.humidity} %</p>    
         `
        $("#forecast-two").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})

        let dayThree = moment(data.list[23].dt, 'X').format("DD/MM/YYYY")
        let iconThree = `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png`;
        let forecastThree = document.querySelector('#forecast-three').innerHTML = `
                <h4> <span>${dayThree}</span></h4>
                <img src="${iconThree}"/>
                <p>Temp: ${(data.list[23].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[23].wind.speed} KPH</p>
                <p>Humidity: ${data.list[23].main.humidity} %</p>
    
        `
        $("#forecast-three").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})

        let dayFour = moment(data.list[31].dt, 'X').format("DD/MM/YYYY")
        let iconFour = `https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}@2x.png`;
        let forecastFour = document.querySelector('#forecast-four').innerHTML = `
                <h4> <span>${dayFour}</span></h4>
                <img src="${iconFour}"/>
                <p>Temp: ${(data.list[31].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[31].wind.speed} KPH</p>
                <p>Humidity: ${data.list[31].main.humidity} %</p>
    
        `
        $("#forecast-four").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})
   
        let dayFive = moment(data.list[39].dt, 'X').format("DD/MM/YYYY")
        let iconFive = `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@2x.png`;
        let forecastFive = document.querySelector('#forecast-five').innerHTML = `
                <h4> <span>${dayFive}</span></h4>
                <img src="${iconFive}"/>
                <p>Temp: ${(data.list[39].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[39].wind.speed} KPH</p>
                <p>Humidity: ${data.list[39].main.humidity} %</p>
    
        `
        $("#forecast-five").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})
     })
     input.value = ''
}


// Storing searched cities in localStorage
function storePlaces() {
 localStorage.setItem('data', JSON.stringify(cityList))
}

// Add click event to the search button
searchBtn.addEventListener('click',function(e) {
 e.preventDefault()
 let searchCity = input.value
 renderWeatherData()

 if(searchCity !== '') {
   if(!cityList.includes(searchCity)) {
     cityList.push(searchCity)
 }
 storePlaces() 
 historyButtons(cityList)
 }
})

// Add  functionality to the history buttons
citiesContainer.addEventListener('click',function(e) {
 e.preventDefault()
 console.log(e.target);

 if(e.target.matches('button')) {
  console.log(e.target);
  let cityName = e.target.textContent
  
  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=7fd780c3c987cc66a03206e9736fa65e&units=metric`)
    .then(response => response.json())
    .then(data => {
      let city = data[0]
      lat = city.lat
      lon = city.lon

      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7fd780c3c987cc66a03206e9736fa65e&units=metric`)
    })
    .then(response => response.json())
    .then(data => {
     
       // Display the weather of a searched location    
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

       // Add title to the 5 day forecast
       forecast.innerHTML = '5-Day Forecast:'
   
       //Display forecast for the next 5 days
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

        let dayTwo = moment(data.list[15].dt, 'X').format("DD/MM/YYYY")
        let iconTwo = `https://openweathermap.org/img/wn/${data.list[15].weather[0].icon}@2x.png`;
        let forecastTwo = document.querySelector('#forecast-two').innerHTML = `
                <h4> <span>${dayTwo}</span></h4>
                <img src="${iconTwo}"/>
                <p>Temp: ${(data.list[15].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[15].wind.speed} KPH</p>
                <p>Humidity: ${data.list[15].main.humidity} %</p>    
       `
       $("#forecast-two").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})

       let dayThree = moment(data.list[23].dt, 'X').format("DD/MM/YYYY")
       let iconThree = `https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@2x.png`;
       let forecastThree = document.querySelector('#forecast-three').innerHTML = `
                <h4> <span>${dayThree}</span></h4>
                <img src="${iconThree}"/>
                <p>Temp: ${(data.list[23].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[23].wind.speed} KPH</p>
                <p>Humidity: ${data.list[23].main.humidity} %</p>
    
       `
       $("#forecast-three").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})

       let dayFour = moment(data.list[31].dt, 'X').format("DD/MM/YYYY")
       let iconFour = `https://openweathermap.org/img/wn/${data.list[31].weather[0].icon}@2x.png`;
       let forecastFour = document.querySelector('#forecast-four').innerHTML = `
                <h4> <span>${dayFour}</span></h4>
                <img src="${iconFour}"/>
                <p>Temp: ${(data.list[31].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[31].wind.speed} KPH</p>
                <p>Humidity: ${data.list[31].main.humidity} %</p>    
       `
       $("#forecast-four").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})
   
       let dayFive = moment(data.list[39].dt, 'X').format("DD/MM/YYYY")
       let iconFive = `https://openweathermap.org/img/wn/${data.list[39].weather[0].icon}@2x.png`;
       let forecastFive = document.querySelector('#forecast-five').innerHTML = `
                <h4> <span>${dayFive}</span></h4>
                <img src="${iconFive}"/>
                <p>Temp: ${(data.list[39].main.temp).toFixed()}°C</p>
                <p>Wind: ${data.list[39].wind.speed} KPH</p>
                <p>Humidity: ${data.list[39].main.humidity} %</p>    
        `
       $("#forecast-five").css({"background":'gray', "color":"white","margin": "10px","padding": "30px"})
     })
 }
})

// Displaying data fron localStorage
function displayButtonsFromStorage() {
 storedCities = JSON.parse(localStorage.getItem('data'))
 console.log(storedCities);
  if(storedCities !== null) {
   cityList = storedCities
   console.log(cityList);
  }
  historyButtons(cityList)
}