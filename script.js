const cityName = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const theme = document.getElementById("theme-toggle");
const temp = document.querySelector(".temp");
const city = document.querySelector(".city");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const desc = document.querySelector(".description");
const weatherIcon = document.querySelector(".weather-icon");
const API_KEY = "8a4e81bbcbcec4008441c73925065a5b";
const body = document.body;
const errorMessage = document.querySelector(".error-message");
navigator.geolocation.getCurrentPosition(getPos)
function getPos(position){
    const x = position.coords.latitude
    const y = position.coords.longitude
    fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${x}&lon=${y}&appid=${API_KEY}&units=metric`
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    city.textContent = data.name;
    temp.textContent = Math.round(data.main.temp) + "°C";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = Math.round(data.wind.speed) + "km/h";
    desc.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  });
}

theme.addEventListener("click", () => {
  body.classList.toggle("night-theme");
});

searchBtn.addEventListener("click", () => {
  try {
    const cityShoosen = cityName.value;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityShoosen}&appid=${API_KEY}&units=metric`
    )
      .then((res) => {
        if (res.status == 404) {
          console.log(404 + "City not found");
          errorMessage.style = "display:block";
          return;
        } else {
          errorMessage.style = "display:none";
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        city.textContent = data.name;
        temp.textContent = Math.round(data.main.temp) + "°C";
        humidity.textContent = data.main.humidity + "%";
        wind.textContent = Math.round(data.wind.speed) + "km/h";
        desc.textContent = data.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
      });
  } catch (error) {
    console.log("Somthing went wrong try again.");
  }
});
