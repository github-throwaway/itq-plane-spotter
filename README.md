# ITQ Plane Spotter

A real-time flight tracking website for the ITQ office in Düsseldorf, showing aircraft arriving and departing from Düsseldorf Airport (EDDL).

## Features

- Real-time flight data from OpenSky Network API
- Displays arriving, departing, and passing aircraft
- Shows altitude, speed, heading, and vertical rate
- Calculates distance and bearing from office location
- Auto-refreshes every 30 seconds
- Display-friendly UI optimized for office monitors
- No API key required

## Office Location

Wanheimer Str. 43, 40472 Düsseldorf (Looking North)

## Live Site

The website is hosted on GitHub Pages and updates automatically with real-time flight data.

## Technology

- Pure HTML/CSS/JavaScript (no dependencies)
- OpenSky Network API for flight data
- Responsive design for desktop and mobile

## Local Development

Simply open `index.html` in a web browser. No build process or server required.

## How It Works

1. Fetches flight data within 50km of Düsseldorf Airport
2. Filters for airborne aircraft only
3. Determines if planes are arriving, departing, or passing by:
   - Distance from airport
   - Altitude
   - Vertical rate (climbing/descending)
   - Speed
4. Sorts by distance from office (closest first)
5. Updates display every 30 seconds

## Data Source

Flight data provided by [OpenSky Network](https://opensky-network.org/), a non-profit association providing open air traffic data.
