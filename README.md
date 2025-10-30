# ITQ Plane Spotter

A real-time flight tracking website for the ITQ office in Düsseldorf, showing aircraft arriving and departing from Düsseldorf Airport (EDDL) using the northeast runway.

## Features

- Real-time flight positions from OpenSky Network API
- Enriched flight details (airline, flight number, aircraft type, routes) from official Düsseldorf Airport API
- Displays only aircraft using northeast runway (05 departures / 23 arrivals)
- Filters for planes visible from north-facing office windows
- Shows origin and destination airports with airline information
- Visual map showing viewing area and plane positions
- Displays altitude, speed, heading, and vertical rate
- Calculates distance and bearing from office location
- Position updates every 15 seconds, flight details every 2 minutes
- Display-friendly UI optimized for office monitors
- No API key required

## Office Location

Wanheimer Str. 43, 40472 Düsseldorf (Looking North)

## Runway Configuration

Düsseldorf Airport (EDDL) has two parallel runways oriented southwest to northeast:
- **Runway 05L/05R**: Departures to the northeast (visible from office)
- **Runway 23L/23R**: Arrivals from the northeast (visible from office)

The website only shows flights using the northeast runway direction, as these are the only ones visible from the north-facing office windows.

## Live Site

The website is hosted on GitHub Pages and updates automatically with real-time flight data.

## Technology

- Pure HTML/CSS/JavaScript (no dependencies)
- OpenSky Network API for real-time aircraft positions
- Düsseldorf Airport official API for enriched flight details
- Canvas-based map visualization
- Responsive design for desktop and mobile

## Local Development

Simply open `index.html` in a web browser. No build process or server required.

## How It Works

1. Fetches real-time aircraft positions within 50km of Düsseldorf Airport from OpenSky Network (every 15 seconds)
2. Enriches position data with flight details from official Düsseldorf Airport API (every 2 minutes):
   - Airline name and flight number
   - Aircraft type and registration
   - Origin and destination airports
   - Uses `X-Requested-With: XMLHttpRequest` header for CORS compatibility
3. Filters for airborne aircraft only
4. Checks if aircraft is in north-facing viewing angle (315° to 45°)
5. Determines if plane is using northeast runway based on:
   - Heading (10-100° for departures, 190-270° for arrivals)
   - Altitude (below 3500m)
   - Vertical rate (climbing for departures, descending for arrivals)
   - Distance from airport (within 10km)
6. Matches aircraft by callsign for accurate data correlation
7. Sorts by distance from office (closest first)
8. Displays on interactive map with flight cards showing all details

## Data Sources

- **Position Data**: [OpenSky Network](https://opensky-network.org/) - Free, open-source flight tracking API
- **Flight Details**: [Düsseldorf Airport](https://www.dus.com/) - Official airport API providing accurate airline names, flight numbers, aircraft types, and route information for all DUS flights
