console.log('Me esta importando este codigo')

async function consultarClima() {
  const ciudad = document.getElementById('ciudad').value.trim();
  if (!ciudad) return alert('Ingrese una ciudad');

  const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`;

  console.log(urlGeo)

  try {
    const geoResp = await fetch(urlGeo);
    const geo = await geoResp.json();

    console.log(geo)

    if (!geo.results || geo.results.length === 0) {
      document.getElementById('resultado').innerHTML = 'Ciudad no encontrada';
      return;
    }

    const lugar = geo.results[0];

    const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${lugar.latitude}&longitude=${lugar.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;

    const climaResp = await fetch(urlClima);
    const clima = await climaResp.json();

    console.log(clima)

    document.getElementById('resultado').innerHTML = `
      <h3>${lugar.name}, ${lugar.country}</h3>
      <p><b>Temperatura:</b> ${clima.current.temperature_2m} °C</p>
      <p><b>Humedad:</b> ${clima.current.relative_humidity_2m}%</p>
      <p><b>Viento:</b> ${clima.current.wind_speed_10m} km/h</p>
    `;
  } catch (e) {
    document.getElementById('resultado').innerHTML = 'Error consultando la API';
    console.error(e);
  }
}
 