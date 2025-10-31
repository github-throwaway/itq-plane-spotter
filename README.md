# ITQ Plane Spotter

A real-time flight tracking website for the ITQ office in Düsseldorf, showing aircraft arriving and departing from Düsseldorf Airport (EDDL) using the northeast runway.

## Features

- **Live flight data** from official Düsseldorf Airport API (updates every minute)
- **Automatic runway detection** via ATIS (shows only visible flights from northeast operations)
- Shows only **currently active flights** (approaching, landing, taxiing, departing)
- Filters flights based on current runway configuration (05 departures / 23 arrivals visible from office)
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

1. **Fetches ATIS data** from ATIS.guru every 5 minutes:
   - Determines current runway configuration (which runways are in use)
   - Identifies visible operations (runway 05 departures / runway 23 arrivals)

2. **Intelligently fetches only visible flights** from Düsseldorf Airport API every minute:
   - If arrivals on runway 23 → **fetches arrivals only**
   - If departures on runway 05 → **fetches departures only**
   - Skips fetching flights you can't see (50% fewer API calls!)
   - Airline names, flight numbers, aircraft types
   - Origin and destination cities (full names with countries)
   - Real-time flight status (approaching, landing, departing, etc.)
   - Uses `X-Requested-With: XMLHttpRequest` header via CORS proxy

3. **Filters by status** to show only active flights:
   - **Arrivals**: Only "approaching" or "landing" (excludes landed)
   - **Departures**: Only "boarding", "taxiing", "departing", "takeoff"

4. **Displays flights** sorted by scheduled time (soonest first)

5. **Updates** every minute with latest status and runway information

This optimized approach provides **live, accurate data** directly from the airport, fetches only what you can actually see, and automatically adapts to changing runway configurations!

## Data Sources

- **Flight Data**: [Düsseldorf Airport](https://www.dus.com/) - Official airport API providing real-time flight status, airline names, flight numbers, and full route information
- **Runway Configuration**: [ATIS.guru](https://atis.guru/) - Live ATIS data for current runway operations
- **Position Data (backup)**: [OpenSky Network](https://opensky-network.org/) - Used occasionally for aircraft position data as supplement
