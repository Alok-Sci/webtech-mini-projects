//target image
const weatherIcon = document.querySelector('#weather-icon');

//target day name
const curDayName = document.querySelector('#day-name');

// target search button 
const searchButton = document.querySelector('#search-btn');
//add event listener on search button
searchButton.addEventListener('click', function() {
    //target input field
    const inputValue = document.querySelector('#input-field').value;

    if (inputValue.trim() !== '') {
        weather(inputValue);
    } else {
        console.log("input field is empty")
    }
});

// weather(city);


let weatherIconsLink = {
    "cloudy-night": "https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-night-3311757-2754891.png?f=webp 1x",
    "cloudy-weather": "https://cdn3d.iconscout.com/3d/premium/thumb/cloudy-weather-3311758-2754892.png?f=webp 1x",
    "foggy-night": "https://cdn3d.iconscout.com/3d/premium/thumb/foggy-night-3311746-2754880.png?f=webp 1x",
    "foggy-night": "https://cdn3d.iconscout.com/3d/premium/thumb/foggy-night-3311766-2754900.png?f=webp 1x",
    "foggy-weather": "https://cdn3d.iconscout.com/3d/premium/thumb/foggy-weather-3311756-2754890.png?f=webp 1x",
    "heavy-rain": "https://cdn3d.iconscout.com/3d/premium/thumb/heavy-rain-3311767-2754901.png?f=webp 1x",
    "heavy-snow": "https://cdn3d.iconscout.com/3d/premium/thumb/heavy-snow-3311752-2754886.png?f=webp 1x",
    "heavy-winds": "https://cdn3d.iconscout.com/3d/premium/thumb/heavy-winds-3311759-2754893.png?f=webp 1x",
    "lightning-and-rain": "https://cdn3d.iconscout.com/3d/premium/thumb/lightning-and-rain-3311770-2754904.png?f=webp 1x",
    "moon": "https://cdn3d.iconscout.com/3d/premium/thumb/moon-3311773-2754907.png?f=webp 1x",
    "rain": "https://cdn3d.iconscout.com/3d/premium/thumb/rain-3311753-2754887.png?f=webp 1x",
    "rain-in-sunny-weather": "https://cdn3d.iconscout.com/3d/premium/thumb/rain-in-sunny-weather-3311768-2754902.png?f=webp 1x",
    "snow": "https://cdn3d.iconscout.com/3d/premium/thumb/snow-3311760-2754894.png?f=webp 1x",
    "snow-wind": "https://cdn3d.iconscout.com/3d/premium/thumb/snow-wind-3311762-2754896.png?f=webp 1x",
    "snow-with-cloud": "https://cdn3d.iconscout.com/3d/premium/thumb/snow-with-cloud-3311751-2754885.png?f=webp 1x",
    "snow-with-wind": "https://cdn3d.iconscout.com/3d/premium/thumb/snow-with-wind-3311750-2754884.png?f=webp 1x",
    "sunny-cloud": "https://cdn3d.iconscout.com/3d/premium/thumb/sunny-cloud-3311748-2754882.png?f=webp 1x",
    "sunny-day": "https://cdn3d.iconscout.com/3d/premium/thumb/sunny-day-3311764-2754898.png?f=webp 1x",
    "sunny-weather-with-wind": "https://cdn3d.iconscout.com/3d/premium/thumb/sunny-weather-with-wind-3311761-2754895.png?f=webp 1x",
    "thunder-with-rain": "https://cdn3d.iconscout.com/3d/premium/thumb/thunder-with-rain-3311754-2754888.png?f=webp 1x",
    "thunderstorm": "https://cdn3d.iconscout.com/3d/premium/thumb/thunderstorm-3311755-2754889.png?f=webp 1x",
    "wind": "https://cdn3d.iconscout.com/3d/premium/thumb/wind-3311772-2754906.png?f=webp 1x",
    "windy-cloud": "https://cdn3d.iconscout.com/3d/premium/thumb/windy-cloud-3311749-2754883.png?f=webp 1x",
    "windy-night": "https://cdn3d.iconscout.com/3d/premium/thumb/windy-night-3311747-2754881.png?f=webp 1x",
    "windy-night": "https://cdn3d.iconscout.com/3d/premium/thumb/windy-night-3311763-2754897.png?f=webp 1x",
};

// console.log(weatherIconsLink);

async function weather(city) {
    const apiUrlV2 = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const apiKeyRohitSir = "7bd851f41aa8d4d1220642c55cf519d2";
    
    // const apiUrlV3 = "https://api.openweathermap.org/data/3.0/weather?units=metric&q=";
    // const apiKeyAlok = "84dec61f7a67dbc45eb87055250548ae";
    let res = await fetch(apiUrlV2 + city + "&appid=" + apiKeyRohitSir),
        data = await res.json();

    console.log(data);

    //target city name
    const cityName = document.querySelector('#city-name');
    cityName.innerText = data.name;
    //target temperature
    const temp = document.querySelector('#temperature');
    temp.innerHTML = Math.round(data.main.temp) + '&deg;C';

    //target humidity value
    const humidity = document.querySelector('#humidity');
    humidity.innerText = data.main.humidity + '%';
    //target wind value
    const windSpeed = document.querySelector('#wind-speed');
    windSpeed.innerText = data.wind.speed + ' KMPH';
    //target visibility value
    const visibility = document.querySelector('#visibility');
    visibility.innerText = ((data.visibility)/1000) + ' KM'

}