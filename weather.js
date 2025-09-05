// Conditions (Using WMO weather codes)
function weatherCodeToGroup(code) {
    if (code === 0) return "Clear";
    if ((code === 1) || (code === 2)) {
        return "Partially Cloudy";
    }
    if ([3, 45, 48].includes(code)) {
        return "Cloudy";
    }
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
        return "Raining";
    }
    if ([71, 73, 75, 77, 85, 86].includes(code)) {
        return "Snowing";
    }
    if (code == 66 || code == 67) {
        return "Freezing Rain (yikes!)";
    }
    return "Unkown (uh oh)";
}

// Minneapolis's location
const lat = 44.9778;
const long = -93.2650;

// Weather API
const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`

// Connect & fetch temp/conditions
fetch(url)
    .then(res => res.json())
    .then(data => {
        const temp = data.current_weather.temperature;
        const code = data.current_weather.weathercode;

        const weatherGroup = weatherCodeToGroup(code);

        const tempF = (temp * 9 / 5) + 32;

        document.getElementById('temperature').textContent = `Temperature: ${tempF} °F/ ${temp} °C`;
        document.getElementById('description').textContent = `Conditions: ${weatherGroup}`;

        const iconEl = document.getElementById(`weather-icon`);
        const iconImg = weatherIcons[weatherGroup];
        iconEl.src = iconImg;
    })
    .catch(err => {
        document.getElementById('temperature').textContent = "Failure to load";
        document.getElementById('description').textContent = "";
        console.error(err);
    });

//NEED IMAGES!!
const weatherIcons = {
    Clear: `icons/clear.png`,
    "Partially Cloudy": `icons/partially_cloudy.png`,
    Cloudy: `icons/cloudy.png`,
    Raining: `icons/raining.png`,
    Snowing: `icons/snowing.png`
};

// Displa Date
const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
const monthName = today.toLocaleDateString("en-US", { month: "long" });
const dayNum = today.getDate();
document.getElementById("date").textContent = `${dayName}, ${monthName} ${dayNum}`;

// Light/Dark Mode
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        document.body.classList.remove('sunrise');
        document.body.classList.add('sunset');
    } else {
        document.body.classList.remove('sunset');
        document.body.classList.add('sunrise');
    }
});
