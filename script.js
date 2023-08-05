let api_key = "b75e837ddcea1fbbf95a1588be44273";
let city_name = "ahmedabad";
let apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}a&units=metric`;

let cityData = [];

function isCityAlreadyAdded(city_name) {
    return cityData.some(city => city.city_name.toLowerCase() === city_name.toLowerCase());
}

function fnAddCity() {
    let cityInput = document.getElementById("search-input");
    city_name = cityInput.value.trim();
    if (city_name === "") {
        alert('Please enter valid city name');
        return;
    }

    if (!isCityAlreadyAdded(city_name)) {
        apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}a&units=metric`;

        fetch(apiurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                AddCityData(data);
            })
            .catch(error => {
                alert('Error while fetching data:', error);
            });
    }
    else {
        alert('City already exists');
        return;
    }
}

function AddCityData(data) {
    console.log(data);

    const city = {
        city_name:data.name,
        name: data.name + ", " + data.sys.country,
        temperature: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        weather: data.weather[0].main
    };
    cityData.push(city);

    cityData.sort((a, b) => a.temperature - b.temperature);
    fnDisplayCities();
}
function fnDisplayCities(){
    let divcontainer = document.getElementById("cards-container");
    
    let generatedhtml = '';

    cityData.forEach(item => {

        let weather_img = "fast_wind.png";
        switch(item.weather){
            case 'Clouds':
                weather_img = "Showers.png";
                break;
            case 'Clear':
                weather_img = "fast_wind.png";
                break;
            case 'Rain':
                weather_img = "mid_rain.png";
                break;
            case 'Wind':
                weather_img = "fast_wind.png";
                break;
    
        }

        generatedhtml +=`<div class="card">
            <div class="left-card">
                <span id="temperature">${item.temperature}<sup id="tempsup">°</sup></span>
                <div class="min-max-temp">
                    <span id="temp_max">H:${item.temp_max}<sup>°</sup></span>
                    <span id="temp_min">L:${item.temp_min}<sup>°</sup></span>
                </div>
                <span id="city-name">${item.name}</span>
            </div>
            <div class="right-card">
                <img src="${weather_img}">
                <span id="weather">${item.weather}</span>
            </div>
        </div>`;
        });

        divcontainer.innerHTML = generatedhtml;
}