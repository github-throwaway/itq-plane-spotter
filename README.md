# ITQ Plane Spotter

A real-time flight tracking website for the ITQ office in Düsseldorf, showing aircraft arriving and departing from Düsseldorf Airport (EDDL) using the northeast runway.

## Features

- Real-time flight data from FlightRadar24 API
- Displays only aircraft using northeast runway (05 departures / 23 arrivals)
- Filters for planes visible from north-facing office windows
- Shows origin and destination cities
- Visual map showing viewing area and plane positions
- Displays altitude, speed, heading, and vertical rate
- Calculates distance and bearing from office location
- Auto-refreshes every 10 seconds
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
- FlightRadar24 API for flight data
- Canvas-based map visualization
- Responsive design for desktop and mobile

## Local Development

Simply open `index.html` in a web browser. No build process or server required.

## How It Works

1. Fetches flight data within 50km of Düsseldorf Airport from FlightRadar24
2. Filters for airborne aircraft only
3. Checks if aircraft is in north-facing viewing angle (315° to 45°)
4. Determines if plane is using northeast runway based on:
   - Heading (20-80° for departures, 200-260° for arrivals on final approach)
   - Altitude (below 3000m / 10,000ft)
   - Vertical rate (climbing for departures, descending for arrivals)
   - Distance from airport (within 25km)
5. Displays origin/destination cities from FlightRadar24 data
6. Sorts by distance from office (closest first)
7. Updates display every 10 seconds

## Data Source

Flight data provided by [FlightRadar24](https://www.flightradar24.com/), the world's most popular flight tracking service.
