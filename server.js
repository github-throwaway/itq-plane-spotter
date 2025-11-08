const express = require('express');
const cors = require('cors');
const { FlightRadar24API } = require('flightradarapi');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize FlightRadar24 API
const frApi = new FlightRadar24API();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'ITQ Plane Spotter API is running' });
});

/**
 * GET /api/flights
 * Get flights within specific bounds
 * Query params: north, south, west, east
 */
app.get('/api/flights', async (req, res) => {
    try {
        const { north, south, west, east } = req.query;

        if (!north || !south || !west || !east) {
            return res.status(400).json({
                error: 'Missing required parameters: north, south, west, east'
            });
        }

        // Format bounds as "N,S,W,E" string
        const bounds = `${north},${south},${west},${east}`;

        const flights = await frApi.getFlights(null, bounds);

        // Transform flight data to a cleaner format
        const flightData = flights.map(flight => ({
            id: flight.id,
            icao24: flight.icao24,
            callsign: flight.callsign,
            flight_number: flight.flight_number || flight.callsign,
            registration: flight.registration,
            aircraft_code: flight.aircraft_code,
            origin_iata: flight.origin_airport_iata,
            destination_iata: flight.destination_airport_iata,
            airline_icao: flight.airline_icao,
            latitude: flight.latitude,
            longitude: flight.longitude,
            altitude: flight.altitude,
            ground_speed: flight.ground_speed,
            heading: flight.heading,
            vertical_speed: flight.vertical_speed,
            squawk: flight.squawk,
            on_ground: flight.on_ground,
            timestamp: flight.time
        }));

        res.json({
            success: true,
            count: flightData.length,
            flights: flightData
        });
    } catch (error) {
        console.error('Error fetching flights:', error);
        res.status(500).json({
            error: 'Failed to fetch flight data',
            message: error.message
        });
    }
});

/**
 * GET /api/flight/:id
 * Get detailed information about a specific flight
 */
app.get('/api/flight/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const details = await frApi.getFlightDetails(id);

        if (!details) {
            return res.status(404).json({
                error: 'Flight not found'
            });
        }

        res.json({
            success: true,
            flight: details
        });
    } catch (error) {
        console.error('Error fetching flight details:', error);
        res.status(500).json({
            error: 'Failed to fetch flight details',
            message: error.message
        });
    }
});

/**
 * GET /api/airport/:iata
 * Get airport information with arrivals and departures
 */
app.get('/api/airport/:iata', async (req, res) => {
    try {
        const { iata } = req.params;

        const details = await frApi.getAirportDetails(iata);

        if (!details) {
            return res.status(404).json({
                error: 'Airport not found'
            });
        }

        res.json({
            success: true,
            airport: details
        });
    } catch (error) {
        console.error('Error fetching airport details:', error);
        res.status(500).json({
            error: 'Failed to fetch airport information',
            message: error.message
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`ITQ Plane Spotter API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`API endpoints:`);
    console.log(`  GET /api/flights?north=X&south=X&west=X&east=X`);
    console.log(`  GET /api/flight/:id`);
    console.log(`  GET /api/airport/:iata`);
});
