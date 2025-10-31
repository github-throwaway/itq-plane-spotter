# ITQ Plane Spotter

A minimalist real-time flight tracking display for the ITQ office in Düsseldorf, showing aircraft arriving and departing from Düsseldorf Airport (EDDL).

## Features

- **Clean, simple display** - one row per flight with essential info only
- **Country flag emojis** for visual identification
- **Aircraft photos** automatically loaded when available
- **Live flight data** from official Düsseldorf Airport API (updates every minute)
- **Automatic runway detection** via ATIS (shows only visible flights from northeast operations)
- Shows only **currently active flights** (approaching, landing, taxiing, departing)
- Filters flights based on current runway configuration (05 departures / 23 arrivals visible from office)
- Displays:
  - Flight number and airline
  - Country flag emoji
  - "from [city]" for arrivals or "to [city]" for departures
  - Aircraft photo (when registration available)
- Optimized for office monitors and line-of-sight viewing
- No API key or authentication required
- Minimal rate limiting (DUS Airport API is very permissive)

## What You'll See

The display shows only flights that are currently visible from the ITQ office:
- **Arrivals**: Flights approaching or landing on runway 23 (coming from the northeast)
- **Departures**: Flights taking off from runway 05 (heading to the northeast)

Each flight is displayed as a single row showing:
- Aircraft photo (if available)
- Flight number
- Airline name
- Country flag + "from [City, Country]" (arrivals) or "to [City, Country]" (departures)
- Status badge (arriving/departing)

## Live Site

The website is hosted on GitHub Pages and updates automatically with real-time flight data.

## Technology

- Pure HTML/CSS/JavaScript (no dependencies)
- Düsseldorf Airport official API for flight data
- ATIS.guru for runway configuration
- Planespotters.net API for aircraft photos
- Responsive design for desktop and mobile

## Local Development

Simply open `index.html` in a web browser. No build process or server required.

## How It Works

1. **Fetches ATIS data** from ATIS.guru every 5 minutes:
   - Determines current runway configuration
   - Identifies visible operations (runway 05 departures / runway 23 arrivals)

2. **Fetches only visible flights** from Düsseldorf Airport API every minute:
   - If arrivals on runway 23 → fetches arrivals only
   - If departures on runway 05 → fetches departures only
   - Gets airline names, flight numbers, origins/destinations
   - Real-time flight status

3. **Filters by status** to show only active flights:
   - **Arrivals**: Only "approaching" or "landing" (excludes landed)
   - **Departures**: Only "boarding", "taxiing", "departing", "takeoff"

4. **Loads aircraft photos** asynchronously:
   - Uses aircraft registration from flight data
   - Fetches photos from Planespotters.net API
   - Falls back to plane emoji if photo unavailable

5. **Displays flights** in simple rows sorted by scheduled time

6. **Updates** every minute automatically

## Line of Sight Detection

The system determines which flights are in your line of sight by:
- Checking the active runway configuration via ATIS
- Only showing flights using the northeast-facing runways (05/23)
- Filtering by flight status to show only active operations
- Automatically adapting when runway configurations change

## Data Sources

- **Flight Data**: [Düsseldorf Airport](https://www.dus.com/) - Official airport API for real-time flight information
- **Runway Configuration**: [ATIS.guru](https://atis.guru/) - Live ATIS data for current runway operations
- **Aircraft Photos**: [Planespotters.net](https://www.planespotters.net/) - Aircraft photography database

## API Rate Limits

Current setup uses:
- **Düsseldorf Airport API**: Very permissive, via CORS proxy
- **ATIS.guru**: Fetched every 5 minutes (288 requests/day)
- **Planespotters API**: On-demand per flight (cached in browser)

Alternative APIs investigated:
- **FlightAware AeroAPI**: Not recommended - only $5/month free ($0.05/call = 100 calls/month)
- **OpenSky Network**: 10-second rate limit for unauthenticated, 4000-8000 credits/day for authenticated
- Current setup is optimal for free tier usage
