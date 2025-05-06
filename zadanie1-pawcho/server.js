const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Logi
const startupTime = new Date();
console.log(`Aplikacja uruchomiona: ${startupTime.toISOString()}`);
console.log(`Autor: Hubert Jędruchniewicz`);
console.log(`Aplikacja nasłuchuje na porcie: ${port}`);

// Endpoint do pobierania pogody
app.get('/api/weather', async (req, res) => {
    try {
        const { city, country } = req.query;
        const apiKey = 'a1c768c791c9e554744dc433ab9d1ecd';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&lang=pl&units=metric`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Błąd pobierania pogody:', error);
        res.status(500).json({ error: 'Nie udało się pobrać danych pogodowych' });
    }
});

// Start serwera
app.listen(port, () => {
    console.log(`Serwer działa pod adresem: http://localhost:${port}`);
});