const apiURL_IP = "https://weathersync101.herokuapp.com/ip"
const apiURL_Weather = 'https://weathersync101.herokuapp.com/weather/'
const apiURL_ICON = 'http://openweathermap.org/img/w/'
    
async function getData(){

    const response = await fetch(apiURL_IP);
    const data = await response.json();

    //store corresponding values
    const {latitude, longitude, city} = data;

    //pass city into corresponding element
    document.getElementById('city').textContent = city;

    //use the stored latitude and longitude as values for the weather api
    const weatherInfo = await fetch (apiURL_Weather + latitude + "," + longitude);
    const weatherData = await weatherInfo.json();
    
    //retrieve the weather data
    const {main, weather} = weatherData

    //convert temp from kelvin to fahrenheit
    const celsius = main.temp  - 273.15;
    const fah = (celsius * 1.8) + 32
    
    //pass the resulting value as a whole number to corresponding elements
    document.getElementById('weather').textContent = fah.toFixed(0);
    document.getElementById('description').textContent = weather[0].description.toUpperCase();

    //retrieve the icon corresponding to the current weather
    const iconInfo = await fetch (apiURL_ICON + weather[0].icon + ".png");
    const iconData = await iconInfo.blob();
    const mage = URL.createObjectURL(iconData);

    //pass the url 
    document.getElementById('image').src= mage;
   
    
    }


getData();