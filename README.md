# Earthquake Data Visualization

This project visualizes earthquake data from the past seven days using Leaflet.js and data from the United States Geological Survey (USGS). 
The data is displayed on an interactive map, with each earthquake represented as a circle marker whose size reflects its magnitude and whose color reflects the earthquake’s depth.

## Features

- **Interactive Map**: Displays the location of earthquakes on a map centered on the United States.
- **Magnitude-based Markers**: The size of each marker is determined by the earthquake’s magnitude.
- **Depth-based Colors**: The color of each marker is based on the depth of the earthquake, with deeper earthquakes shown in darker colors.
- **Pop-up Information**: Clicking on a marker shows the earthquake’s location and the time it occurred.
- **Legend**: A dynamic legend explains the color scheme for earthquake depths.


## Data Source

The earthquake data is sourced from the [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), specifically the weekly summary feed:

- **URL**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson`
- **Data format**: GeoJSON, containing details such as magnitude, depth, location, and time.


## Project Structure

- `index.html`: The main HTML file that loads the map and other resources.
- `app.js`: Contains all the JavaScript logic to fetch data, create the map, and add earthquake markers.
- `styles.css`: Contains the styling for the map and other elements.
- `README.md`: This file, explaining the project and how to run it.

