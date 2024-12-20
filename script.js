const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".city_input");
const cardDisplay = document.querySelector(".display_container");
const apikey = "67e48e58784c106dc249864bbad0830b";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.log(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city.");
    }
})

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    console.log(response);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);

    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;
    
    console.log(typeof(temp));

    cardDisplay.textContent = "";
    cardDisplay.style.display = "flex";

    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("city_display");

    tempDisplay.textContent = `${Math.floor((temp - 273.15) * (9/5) + 32)}°C`;
    tempDisplay.classList.add("temp_display");

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity_display");

    descriptionDisplay.textContent = description;
    descriptionDisplay.classList.add("description_display"); 

    emojiDisplay.textContent = getWeatherEmoji(id);
    emojiDisplay.classList.add("weather_emoji");

    cardDisplay.appendChild(cityDisplay);
    cardDisplay.appendChild(tempDisplay);
    cardDisplay.appendChild(humidityDisplay);
    cardDisplay.appendChild(descriptionDisplay);
    cardDisplay.appendChild(emojiDisplay);
}

function getWeatherEmoji(weatherID){
    switch(true){
        case(weatherID >= 200 && weatherID < 300):
            return "🌩️";
        case(weatherID >= 300 && weatherID < 400):
            return "🌧️";
        case(weatherID >= 500 && weatherID < 600):
            return "🌧️";
        case(weatherID >= 600 && weatherID < 700):
            return "🌨️";
        case(weatherID >= 700 && weatherID < 800):
            return "☁️";
        case(weatherID == 800):
            return "☀️";
        case(weatherID >= 801 && weatherID <810):
            return "☁️";
        default:
            return "？";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error_display");

    cardDisplay.textContent = "";
    cardDisplay.style.display = "flex";
    cardDisplay.appendChild(errorDisplay);
}