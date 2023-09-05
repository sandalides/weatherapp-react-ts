import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "e211f1ffa8e54e409f065d7a2e3dbb92",
  base: "https://api.openweathermap.org/data/2.5/",
};

interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data: WeatherData = await response.json();
      setWeather(data);
      setQuery("");
      setErrorMessage(null); // Clear any previous error messages
    } catch (error) {
      console.error(error);
      setWeather(null);
      setErrorMessage("City not found"); // Set the error message
    }
  };

  const dateBuilder = (d: Date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const handleButtonClick = () => {
    if (query.trim() !== "") {
      fetchData();
    } else {
      setErrorMessage("Please enter a city");
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <div className="search-container">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleButtonClick(); // Fetch data when Enter key is pressed
                }
              }}
            />
            <button className="search-button" onClick={handleButtonClick}>
              Enter
            </button>
          </div>
        </div>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {weather && weather.main && (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
