// Clock functionality
function updateClock() {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const greetingElement = document.getElementById('greeting');

    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);

    // Update greeting
    const hour = now.getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) {
        greeting = 'Good morning';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon';
    } else if (hour >= 18 && hour < 22) {
        greeting = 'Good evening';
    } else {
        greeting = 'Good night';
    }
    greetingElement.textContent = `${greeting}, Boris`;
}

// Background handling
let backgroundImages = [];

async function loadBackgrounds() {
    try {
        // Always fetch from backgrounds.json as a regular web asset
        const response = await fetch('backgrounds.json');
        const data = await response.json();
        backgroundImages = data.backgrounds || [];
    } catch (error) {
        console.error('Error loading backgrounds:', error);
        backgroundImages = [];
    }
}

function setRandomBackground() {
    if (backgroundImages.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const img = new Image();
    // Path is relative to the web server's root (Live Server)
    const imagePath = `backgrounds/${backgroundImages[randomIndex]}`;
    
    img.src = imagePath;
    img.onload = () => {
        document.body.style.backgroundImage = `url('${imagePath}')`;
    };
    img.onerror = () => {
        console.error('Error loading image:', imagePath);
        // Try another image if this one fails
        setRandomBackground();
    };
}

// Weather functionality
async function updateWeather() {
    // Arnold, Nottingham coordinates
    const LAT = 53.0;
    const LON = -1.1;
    const URL = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=auto`;

    try {
        const response = await fetch(URL);
        const data = await response.json();

        if (data.current) {
            const temp = Math.round(data.current.temperature_2m);
            const weatherCode = data.current.weather_code;
            
            // Get weather description based on WMO Weather interpretation codes
            const weatherDescriptions = {
                0: 'Clear sky',
                1: 'Mainly clear',
                2: 'Partly cloudy',
                3: 'Overcast',
                45: 'Foggy',
                48: 'Depositing rime fog',
                51: 'Light drizzle',
                53: 'Moderate drizzle',
                55: 'Dense drizzle',
                61: 'Slight rain',
                63: 'Moderate rain',
                65: 'Heavy rain',
                71: 'Slight snow',
                73: 'Moderate snow',
                75: 'Heavy snow',
                77: 'Snow grains',
                80: 'Slight rain showers',
                81: 'Moderate rain showers',
                82: 'Violent rain showers',
                85: 'Slight snow showers',
                86: 'Heavy snow showers',
                95: 'Thunderstorm',
                96: 'Thunderstorm with slight hail',
                99: 'Thunderstorm with heavy hail'
            };

            const description = weatherDescriptions[weatherCode] || 'Unknown';
            
            // Simple weather icons using emoji
            const weatherIcons = {
                0: '☀️',
                1: '🌤️',
                2: '⛅',
                3: '☁️',
                45: '🌫️',
                48: '🌫️',
                51: '🌦️',
                53: '🌦️',
                55: '🌧️',
                61: '🌧️',
                63: '🌧️',
                65: '🌧️',
                71: '🌨️',
                73: '🌨️',
                75: '🌨️',
                77: '🌨️',
                80: '🌧️',
                81: '🌧️',
                82: '🌧️',
                85: '🌨️',
                86: '🌨️',
                95: '⛈️',
                96: '⛈️',
                99: '⛈️'
            };

            document.getElementById('temperature').textContent = `${temp}°C`;
            document.getElementById('weather-description').textContent = description;
            document.getElementById('weather-icon').textContent = weatherIcons[weatherCode] || '❓';
        } else {
            throw new Error('Weather data not available');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('temperature').textContent = '--°C';
        document.getElementById('weather-description').textContent = 'Weather unavailable';
        document.getElementById('weather-icon').textContent = '❓';
    }
}

// Initialize
async function init() {
    // Load backgrounds
    await loadBackgrounds();
    
    // Start clock
    updateClock();
    setInterval(updateClock, 1000);

    // Update weather
    updateWeather();
    setInterval(updateWeather, 1800000); // Update every 30 minutes

    // Set initial background
    setRandomBackground();

    // No periodic check for images needed in this setup, as backgrounds.json is static
    // If you add/remove images, you'll need to manually update backgrounds.json and refresh the Live Server page.

    // Focus search input
    document.getElementById('search-input').focus();
}

// Run initialization when the page loads
document.addEventListener('DOMContentLoaded', init); 