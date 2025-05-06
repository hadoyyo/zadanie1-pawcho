const cityOptions = {
    pl: ['Warszawa', 'Kraków', 'Gdańsk'],
    de: ['Berlin', 'Monachium', 'Hamburg'],
    fr: ['Paryż', 'Lyon', 'Marsylia']
};

function updateCities() {
    const country = document.getElementById('country').value;
    const citySelect = document.getElementById('city');

    citySelect.innerHTML = '';
    if (country && cityOptions[country]) {
        cityOptions[country].forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
        citySelect.disabled = false;
    } else {
        const option = document.createElement('option');
        option.textContent = 'Najpierw wybierz kraj';
        citySelect.appendChild(option);
        citySelect.disabled = true;
    }
}

async function getWeather(city, country) {
    try {
        const response = await fetch(`/api/weather?city=${city}&country=${country}`);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherInfo = `
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">${data.name}</h3>
                        <p class="card-text"><b>Temperatura:</b> ${data.main.temp}°C</p>
                        <p class="card-text"><b>Odczuwalna:</b> ${data.main.feels_like}°C</p>
                        <p class="card-text"><b>Wilgotność:</b> ${data.main.humidity}%</p>
                        <p class="card-text"><b>Ciśnienie:</b> ${data.main.pressure} hPa</p>
                        <p class="card-text"><b>Pogoda:</b> ${data.weather[0].description}</p>
                        <p class="card-text"><b>Wiatr:</b> ${data.wind.speed} m/s</p>
                    </div>
                </div>
            `;
            document.getElementById('weatherInfo').innerHTML = weatherInfo;
        } else {
            document.getElementById('weatherInfo').innerHTML = `
                <div class="alert alert-danger">Nie udało się pobrać pogody dla wybranego miasta.</div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('weatherInfo').innerHTML = `
            <div class="alert alert-danger">Wystąpił błąd podczas pobierania danych pogodowych.</div>
        `;
    }
}

document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;

    if (city && city !== 'Najpierw wybierz kraj') {
        getWeather(city, country);
    } else {
        alert("Proszę wybrać miasto");
    }
});