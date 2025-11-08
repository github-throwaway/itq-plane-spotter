# ITQ Plane Spotter

Real-time aviation intelligence dashboard for Düsseldorf Airport (EDDL/DUS). Track visible planes, upcoming flights, weather conditions, and active runways.

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
- **Dual API Architecture**: Uses FlightRadarAPI backend with fallback to direct API calls

## Architecture

The application consists of two components:

### Frontend (`index.html`)
Single-page web application with:
- Pure HTML5, CSS3, and vanilla JavaScript
- No build process required
- Automatic fallback when backend is unavailable
- 3-column responsive layout

### Backend (`server.js`)
Node.js API server using the [FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI) library:
- RESTful API endpoints
- Cleaner abstraction over FlightRadar24 data
- Better error handling
- CORS enabled for frontend access

**Important Note**: FlightRadarAPI is an unofficial SDK for educational purposes only. For commercial use, contact Flightradar24 directly at business@fr24.com.

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd itq-plane-spotter
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Option 1: With Local Backend (Recommended)

1. Start the backend server:
```bash
npm start
```
The API server will start on `http://localhost:3000`

2. Open `index.html` in your browser or serve it:
```bash
# Python 3
python3 -m http.server 8000

# Node.js http-server
npx http-server -p 8000
```

3. Navigate to `http://localhost:8000`

The frontend automatically uses the local backend API when available.

### Option 2: Without Backend (Fallback Mode)

To run without the backend server:

1. Edit `index.html` and change:
```javascript
const USE_LOCAL_API = false;
```

2. Open `index.html` directly in your browser

In fallback mode, the app uses direct API calls through a CORS proxy (may be slower or less reliable).

## API Endpoints

The backend server provides the following REST API:

### Health Check
```
GET /api/health
```
Returns API status.

### Get Flights
```
GET /api/flights?north=X&south=X&west=X&east=X
```
Fetch flights within geographic bounds.

**Parameters:**
- `north`: Northern latitude boundary
- `south`: Southern latitude boundary
- `west`: Western longitude boundary
- `east`: Eastern longitude boundary

**Example:**
```bash
curl "http://localhost:3000/api/flights?north=51.410&south=51.200&west=6.700&east=6.980"
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "flights": [
    {
      "id": "3558f123",
      "callsign": "DLH123",
      "flight_number": "LH123",
      "registration": "D-AIZZ",
      "aircraft_code": "A320",
      "origin_iata": "DUS",
      "destination_iata": "FRA",
      "latitude": 51.305,
      "longitude": 6.860,
      "altitude": 2500,
      "ground_speed": 245,
      "heading": 180
    }
  ]
}
```

### Get Flight Details
```
GET /api/flight/:id
```
Get detailed information about a specific flight.

**Example:**
```bash
curl "http://localhost:3000/api/flight/3558f123"
```

### Get Airport Info
```
GET /api/airport/:iata
```
Get airport information by IATA code.

**Example:**
```bash
curl "http://localhost:3000/api/airport/DUS"
```

### Get Airlines
```
GET /api/airlines
```
Get list of all airlines.

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
Change update frequency (default: 60 seconds):

```javascript
const REFRESH_INTERVAL = 60000; // milliseconds
```

### API Mode
Toggle between local backend and fallback mode:

```javascript
const USE_LOCAL_API = true; // false for direct API calls
```

## Development

### Development Mode
Run backend with auto-reload:
```bash
npm run dev
```

### Project Structure
```
itq-plane-spotter/
├── index.html          # Frontend web application
├── server.js           # Backend API server
├── package.json        # Node.js dependencies
├── .gitignore         # Git ignore rules
└── README.md          # This file
```

## Technologies

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- No build process or dependencies

**Backend:**
- Node.js, Express
- FlightRadarAPI library

**Data Sources:**
- [FlightRadar24](https://www.flightradar24.com/) - Flight tracking (via FlightRadarAPI)
- [DUS Airport API](https://www.dus.com/) - Scheduled flights
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

## Troubleshooting

### Backend not starting
- Check if port 3000 is in use
- Verify Node.js installation: `node --version`
- Reinstall dependencies: `npm install`

### No flights showing
- Check backend health: `http://localhost:3000/api/health`
- Check browser console for errors
- Try fallback mode: Set `USE_LOCAL_API = false`
- Verify internet connectivity

### API rate limiting
The FlightRadarAPI handles rate limiting automatically. For production:
- Implement response caching
- Increase refresh intervals
- Consider commercial FlightRadar24 API access

## Deployment

### GitHub Pages (Frontend Only)
The frontend can run standalone using fallback mode:
1. Set `USE_LOCAL_API = false` in `index.html`
2. Push to GitHub Pages
3. Access at `https://username.github.io/itq-plane-spotter`

### Full Deployment (with Backend)
Deploy backend to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

Update `LOCAL_API_BASE` in `index.html` to your backend URL:
```javascript
const LOCAL_API_BASE = 'https://your-backend.herokuapp.com/api';
```

## License

This project is for educational purposes only. The FlightRadarAPI library is unofficial and not intended for commercial use. For commercial FlightRadar24 data access, contact business@fr24.com.

## Credits

- [FlightRadarAPI](https://github.com/JeanExtreme002/FlightRadarAPI) by JeanExtreme002
- [FlightRadar24](https://www.flightradar24.com/)
- [Planespotters.net](https://www.planespotters.net/)
- [ATIS Guru](https://atis.guru/)
- [METAR-TAF.com](https://metar-taf.com/)
- [Düsseldorf Airport](https://www.dus.com/)
