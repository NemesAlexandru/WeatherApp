const searchElement = document.querySelector('[data-city-search]');
const searchBox = new google.maps.places.SearchBox(searchElement);


searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0];
    if(place == null) return
    const latitude = place.geometry.location.lat();
    const longitude = place.geometry.location.lng();
    fetch('/weather', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude  
        })
    }).then(res => res.json())
    .then(data => {
        setWeatherData(data, place.formatted_address)
        console.log(data);
    });
});

 const locationElement = document.querySelector('[data-location]')
 const statusElement = document.querySelector('[data-status]')
 const temperatureElement = document.querySelector('[data-temperature]')
 const feelsLikeElement = document.querySelector('[data-feelslike]')
 const windElement = document.querySelector('[data-wind]')
 const iconElement = document.querySelector('[data-icon]')



function setWeatherData(data, place){

locationElement.textContent = place
statusElement.textContent = data.weather[0]["description"].toUpperCase()
temperatureElement.textContent = data.main.temp + ' °C'
feelsLikeElement.textContent = data.main.feels_like + ' °C'
windElement.textContent = data.wind.speed + ' m/s'

const iconCode = data.weather[0].icon
const iconUrl = `<img src=http://openweathermap.org/img/wn/${iconCode}@2x.png alt="weather icon" width="150" height="150">`
iconElement.innerHTML = iconUrl

}