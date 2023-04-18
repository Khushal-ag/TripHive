mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: hotel.geometry.coordinates,
    zoom: 8,
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker().setLngLat(hotel.geometry.coordinates).setPopup(
    new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<div class='mt-3'><h4>${hotel.title}</h4><a href="https://www.google.com/maps/place/${hotel.location}" class='text-decoration-none text-secondary' target="_blank">${hotel.location}</a></div>`
        )
).addTo(map)