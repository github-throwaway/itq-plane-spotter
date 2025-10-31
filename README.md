# ITQ Plane Spotter

A real-time flight tracking website for the ITQ office in Düsseldorf, showing aircraft arriving and departing from Düsseldorf Airport (EDDL) using the northeast runway.

## Features

- **Live flight data** from official Düsseldorf Airport API (updates every minute)
- Shows only **currently active flights** (approaching, landing, taxiing, departing)
- Displays airline names, flight numbers, and full routes with city names
- Shows flight status in real-time (landed, taxiing, departing, etc.)
- Full city names with countries (e.g., "Lyon, France" not "LYS")
- Sorts flights by scheduled time
- Display-friendly UI optimized for office monitors
- No API key or authentication required
- Minimal rate limiting (DUS Airport API is very permissive)

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

1. Fetches flight data from official Düsseldorf Airport API every minute:
   - All arrivals and departures with full details
   - Airline names, flight numbers, aircraft types
   - Origin and destination cities (full names with countries)
   - Real-time flight status (approaching, landed, taxiing, departing, etc.)
   - Uses `X-Requested-With: XMLHttpRequest` header via CORS proxy for compatibility

2. Filters flights by status to show only **currently active** flights:
   - **Arrivals**: approaching, landing, landed, taxiing
   - **Departures**: boarding, taxiing, departing, takeoff

3. Displays flights sorted by scheduled time (soonest first)

4. Updates display every minute with latest status information

This approach provides **live, accurate data** directly from the airport without relying on third-party tracking services or hitting rate limits.

## Data Source

- **Primary**: [Düsseldorf Airport](https://www.dus.com/) - Official airport API providing real-time flight status, airline names, flight numbers, and full route information for all DUS flights
- **Supplementary**: [OpenSky Network](https://opensky-network.org/) - Used occasionally for aircraft position data as backup
