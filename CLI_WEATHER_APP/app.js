import readline from "readline/promises";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const API_KEY = ""; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const input = await rl.question("Enter the city name: ");
const city = input.trim();

if (!city) {
    console.error("City name cannot be empty.");
    rl.close();
    process.exit(1);
}

await getWeather(city);
rl.close();

async function getWeather(city) {
    const url = `${BASE_URL}?q=${encodeURIComponent(
        city
    )}&appid=${API_KEY}&units=metric`;

    try {
        console.log("\nFetching weather...\n");

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            console.error(`Error ${response.status}: ${data.message}`);
            return;
        }

        const { name, sys, main, weather, wind } = data;

        console.log(`City        : ${name}, ${sys.country}`);
        console.log(`Weather    : ${weather[0].main}`);
        console.log(`Description : ${weather[0].description}`);
        console.log(`Temperature: ${main.temp} °C`);
        console.log(`Feels Like  : ${main.feels_like} °C`);
        console.log(`Humidity    : ${main.humidity}%`);
        console.log(`Wind Speed : ${wind.speed} m/s`);
    } catch (err) {
        console.error("Something went wrong.");
        console.error(err.message);
    }
}