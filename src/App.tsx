import React from "react";
import "./App.css";
import "./index.css";

const API_KEY = "8fc4e46e822580d5655a161dd7b302d5";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

function App() {
  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." />
        </div>
      </main>
    </div>
  );
}

export default App;
