// API endpoint for the past week's earthquake data
const earthquakeApiUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Fetch the earthquake data from the API
d3.json(earthquakeApiUrl).then(function(response) {
    // Pass the data features to be visualized on the map
    mapEarthquakeData(response.features);
});

function mapEarthquakeData(earthquakeData) {
    // Define a function to create popups with relevant earthquake details
    function generatePopup(feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p>`);
    }

    // Function to determine marker size based on earthquake magnitude
    function calculateRadius(magnitude) {
        return magnitude * 5;  // Scaling factor for marker size
    }

    // Function to choose marker color based on earthquake depth
    function chooseColor(depth) {
        return depth > 90 ? "#FF0000" :
               depth > 70 ? "#FF8C00" :
               depth > 50 ? "#FFD700" :
               depth > 30 ? "#ADFF2F" :
               depth > 10 ? "#9ACD32" :
                            "#00FF00";
    }

    // Create a GeoJSON layer that includes point markers for each earthquake
    const earthquakeMarkers = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: calculateRadius(feature.properties.mag),  // Scale marker by magnitude
                fillColor: chooseColor(feature.geometry.coordinates[2]),  // Color by depth
                color: "#000",  // Outline color
                weight: 1,  // Outline width
                opacity: 1,
                fillOpacity: 1  // Transparency of fill color
            });
        },
        onEachFeature: generatePopup  // Attach popup to each marker
    });

    // Call function to create the map and add earthquake markers
    buildMap(earthquakeMarkers);
}

function buildMap(earthquakeMarkers) {
    // Create the base map layer using OpenStreetMap tiles
    const baseMapLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
    });

    // Set up the base and overlay map layers
    const baseLayer = {
        "Earthquake Map": baseMapLayer
    };

    const overlayLayer = {
        Earthquakes: earthquakeMarkers
    };

    // Initialize the map and set the default view
    const map = L.map("map", {
        center: [37.09, -95.71],  // Center of the map
        zoom: 5,  // Initial zoom level
        layers: [baseMapLayer, earthquakeMarkers]  // Add both layers to the map
    });

    // Add controls to switch between layers
    L.control.layers(baseLayer, overlayLayer, {
        collapsed: false  // Ensure the layer control is expanded
    }).addTo(map);

    // Add a legend to explain depth-color mapping
    const depthLegend = L.control({ position: "bottomright" });

    depthLegend.onAdd = function () {
        const legendDiv = L.DomUtil.create("div", "info legend");
        legendDiv.style.backgroundColor = "Grey"; 
        legendDiv.style.padding = "5px 6px";
        legendDiv.style.fontSize = "14px";
        const depthLevels = [-10, 10, 30, 50, 70, 90];
        const colorScale = ["#00FF00", "#9ACD32", "#ADFF2F", "#FFD700", "#FF8C00", "#FF0000"];
    
        // Loop through depth levels to create legend items
        for (let i = 0; i < depthLevels.length; i++) {
            legendDiv.innerHTML +=
                `<i style="background:${colorScale[i]}; width: 12px; height: 12px; display: inline-block;"></i> ${depthLevels[i]}${(depthLevels[i + 1] ? '&ndash;' + depthLevels[i + 1] : '+')}<br>`;
        }
        return legendDiv;
    };
    depthLegend.addTo(map);  // Attach the legend to the map
}
