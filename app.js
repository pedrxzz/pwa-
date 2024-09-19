document.getElementById('get-location').addEventListener('click', async () => {
    try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        updateLocation(latitude, longitude);
    } catch (error) {
        console.error(error);
        alert('Não foi possível obter a localização.');
    }
});

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject(new Error('Geolocalização não suportada pelo navegador.'));
        }
    });
}

function updateLocation(lat, long) {
    document.getElementById('location').innerText = `Latitude: ${lat.toFixed(5)}, Longitude: ${long.toFixed(5)}`;
    updateMap(lat, long);
}

function updateMap(lat, long) {
    const map = L.map('map').setView([lat, long], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '©️ OpenStreetMap'
    }).addTo(map);

    L.marker([lat, long]).addTo(map)
        .bindPopup('Você está aqui!')
        .openPopup();
}
