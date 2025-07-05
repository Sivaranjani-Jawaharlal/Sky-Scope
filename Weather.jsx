import { useState } from 'react';
import bgImage from '../images/bg.jpg';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5c23aedb1e89f2b410a8386293286d9&units=metric`);
      const data = await response.json();
      setTimeout(() => {
        setWeatherData({
          city: city,
          temp: 22,
          description: 'Partly cloudy',
          humidity: 65,
          wind: 12
        });
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="background-image" style={{ backgroundImage: `url(${bgImage})` }}></div>
      <div className="weather-card">
        <h1>Sky Scope</h1>
        <p className="subtitle">Find out the weather conditions of the city</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {weatherData && (
          <div className="weather-info">
            <h2>{weatherData.city}</h2>
            <div className="weather-details">
              <p>🌡️ Temperature: {weatherData.temp}°C</p>
              <p>🌤️ Conditions: {weatherData.description}</p>
              <p>💧 Humidity: {weatherData.humidity}%</p>
              <p>💨 Wind: {weatherData.wind} km/h</p>
            </div>
          </div>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Weather;
