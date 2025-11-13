# ITQ Plane Spotter

Real-time aviation intelligence dashboard for Düsseldorf Airport (EDDL/DUS). Track visible planes, upcoming flights, weather conditions, and active runways.

**Live Demo:** https://github-throwaway.github.io/itq-plane-spotter/

## Features

- **Live Flight Tracking**: Real-time visualization of aircraft in the viewing area using FlightRadar24 data
- **Upcoming Flights**: Preview of flights approaching within 2 hours
- **Interactive Map**: FlightRadar24 embedded map centered on the airport
- **Weather Information**: Live METAR data for EDDL
- **Active Runway**: Current runway configuration based on ATIS
- **Flight Details**: Comprehensive information including:
  - Aircraft type and registration
  - Origin and destination with country flags
  - Departure and arrival times
  - Aircraft photos from Planespotters.net
  - Approach status with intelligent time display
- **Dynamic Refresh**: Automatically adjusts update frequency based on flight activity

## Architecture

Single-page web application built with:
- Pure HTML5, CSS3, and vanilla JavaScript
- No build process or dependencies required
- Direct API integration with FlightRadar24 via CORS proxy

## Running Locally

Simply open `index.html` in your browser or serve it with a local web server:

```bash
# Python 3
python3 -m http.server 8000

# Node.js http-server
npx http-server -p 8000
```

Then navigate to `http://localhost:8000`

## Configuration

### View Bounds
Adjust the monitored geographic area in `index.html`:

```javascript
const VIEW_BOUNDS = {
    north: 51.320,  // Northern boundary
    south: 51.290,  // Southern boundary
    west: 6.820,    // Western boundary
    east: 6.900     // Eastern boundary
};

const SEARCH_BOUNDS = {
    north: VIEW_BOUNDS.north + 0.09,
    south: VIEW_BOUNDS.south - 0.09,
    west: VIEW_BOUNDS.west - 0.12,
    east: VIEW_BOUNDS.east + 0.12
};
```

### Refresh Interval
The app uses dynamic refresh intervals based on flight activity:

```javascript
const REFRESH_INTERVAL_FAST = 15000;    // 15 seconds when planes are nearby
const REFRESH_INTERVAL_NORMAL = 30000;  // 30 seconds when moderate activity
const REFRESH_INTERVAL_SLOW = 60000;    // 60 seconds when no activity
```

## Project Structure
```
itq-plane-spotter/
├── index.html          # Complete web application
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Technologies

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- No build process or dependencies

**Data Sources:**
- [FlightRadar24](https://www.flightradar24.com/) - Flight tracking and scheduled flights
- [Planespotters.net](https://www.planespotters.net/) - Aircraft photos
- [ATIS Guru](https://atis.guru/) - Runway information
- [METAR-TAF.com](https://metar-taf.com/) - Weather data

## Features in Detail

### METAR Widget
- Live weather updates for EDDL
- No color change on hover (fixed)
- Embedded from metar-taf.com

### Flight Display
- **Visible Planes**: Detailed cards for flights in viewing area
- **Upcoming Flights**: Compact list of approaching flights (< 2 hours)
- **Smart Deduplication**: Flights never appear in both sections

### Time Display Logic
- **Normal flights**: Estimated/actual time primary, scheduled struck through if different
- **Approach status**: Scheduled time primary, estimated struck through (switched)

### Map Alignment
The FlightRadar24 map center matches the VIEW_BOUNDS area monitored by the API.

## Deployment

### GitHub Pages
The app is deployed at: https://github-throwaway.github.io/itq-plane-spotter/

To deploy your own:
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Select the main branch as source
4. Access at `https://your-username.github.io/itq-plane-spotter`

## Troubleshooting

### No flights showing
- Check browser console for errors
- Verify internet connectivity
- Try refreshing the page
- Check if FlightRadar24 is accessible in your region

### CORS proxy issues
The app uses a CORS proxy to access FlightRadar24 APIs. If you encounter issues:
- Try a different browser
- Check browser console for specific errors
- Verify the CORS proxy service is operational

## License

This project is for educational purposes only. FlightRadar24 data is accessed through unofficial means and not intended for commercial use. For commercial FlightRadar24 data access, contact business@fr24.com.

## Credits

- [FlightRadar24](https://www.flightradar24.com/)
- [Planespotters.net](https://www.planespotters.net/)
- [ATIS Guru](https://atis.guru/)
- [METAR-TAF.com](https://metar-taf.com/)
