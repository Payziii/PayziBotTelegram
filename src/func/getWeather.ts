const key = process.env.WEATHER_KEY;

export default async function getCurrent(city: string) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${encodeURIComponent(city)}&lang=ru`;

    const response = await fetch(url, {
        method: 'GET'
    });

    const data = await response.json();

    return data;
}