mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-103.5917, 40.6699],
    zoom: 3
});

map.on('load', () => {
    map.addSource('hotels', {
        type: 'geojson',
        data: hotels,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50

    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'hotels',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#76c893',
                15,
                '#34a0a4',
                35,
                '#1a759f'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                20,
                20,
                40,
                30
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'hotels',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 14
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'hotels',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('hotels').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    map.on('click', 'unclustered-point', (e) => {
        const { popUpMarkup } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});