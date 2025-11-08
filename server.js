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

        console.log(`Fetching flights for bounds: ${bounds}`);
        const flights = await frApi.getFlights(null, bounds);

        console.log(`Found ${flights.length} flights`);

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

        console.log(`Fetching details for flight ID: ${id}`);
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
 * Get airport information
 */
app.get('/api/airport/:iata', async (req, res) => {
    try {
        const { iata } = req.params;

        console.log(`Fetching airport info for: ${iata}`);
        const airport = await frApi.getAirport(iata);

        if (!airport) {
            return res.status(404).json({
                error: 'Airport not found'
            });
        }

        res.json({
            success: true,
            airport: airport
        });
    } catch (error) {
        console.error('Error fetching airport info:', error);
        res.status(500).json({
            error: 'Failed to fetch airport information',
            message: error.message
        });
    }
});

/**
 * GET /api/airlines
 * Get list of airlines
 */
app.get('/api/airlines', async (req, res) => {
    try {
        console.log('Fetching airlines list');
        const airlines = await frApi.getAirlines();

        res.json({
            success: true,
            count: airlines.length,
            airlines: airlines
        });
    } catch (error) {
        console.error('Error fetching airlines:', error);
        res.status(500).json({
            error: 'Failed to fetch airlines',
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
    console.log(`  GET /api/airlines`);
});
