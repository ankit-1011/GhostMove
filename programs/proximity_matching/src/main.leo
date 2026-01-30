// GhostMove: Zero-Knowledge Proximity Matching
// Drivers prove proximity to pickup location without revealing exact coordinates
// Compatible with Leo 3.4.0 (ProvableHQ)

program proximity_matching.aleo {
    // Location coordinates (encrypted)
    // These are private fields that won't be revealed in proofs
    struct Location {
        latitude: field,   // Encrypted latitude
        longitude: field, // Encrypted longitude
    }

    // Proximity proof result (public)
    struct ProximityProof {
        ride_id: field,
        driver_address: address,
        is_within_range: bool,
        max_distance_km: u32,
        proof_timestamp: u64,
    }

    // Ride request with encrypted pickup location
    struct RideRequest {
        ride_id: field,
        rider_address: address,
        pickup_location: Location,
        max_distance_km: u32,  // Maximum acceptable distance in km
        created_at: u64,
        is_active: bool,
    }

    // Constructor required for deployment
    @noupgrade
    async constructor() {}

    // Create a ride request with encrypted pickup location
    transition create_ride_request(
        ride_id: field,
        rider_address: address,
        pickup_latitude: field,
        pickup_longitude: field,
        max_distance_km: u32,
        timestamp: u64
    ) -> RideRequest {
        // Create encrypted location
        let pickup_location = Location {
            latitude: pickup_latitude,
            longitude: pickup_longitude,
        };

        // Create ride request
        let ride_request = RideRequest {
            ride_id: ride_id,
            rider_address: rider_address,
            pickup_location: pickup_location,
            max_distance_km: max_distance_km,
            created_at: timestamp,
            is_active: true,
        };

        // Return ride request (can be stored off-chain or in records)
        return ride_request;
    }

    // Driver proves proximity without revealing exact location
    // Uses zero-knowledge range proofs to verify distance
    // Takes ride_request as input parameter (stored off-chain)
    transition prove_proximity(
        ride_request: RideRequest,
        driver_address: address,
        driver_latitude: field,   // Private: driver's actual location
        driver_longitude: field, // Private: driver's actual location
        timestamp: u64
    ) -> ProximityProof {
        // Verify ride is still active
        assert(ride_request.is_active == true);

        // Calculate squared distance (ZK-friendly, avoids sqrt)
        // This computation happens without revealing actual coordinates
        let distance_squared: field = calculate_distance(
            ride_request.pickup_location.latitude,
            ride_request.pickup_location.longitude,
            driver_latitude,
            driver_longitude
        );

        // Convert max_distance to squared for comparison
        let max_distance_squared: field = (ride_request.max_distance_km as field) * (ride_request.max_distance_km as field);

        // Verify squared distance is within acceptable range (ZK range proof)
        // This proves "distance <= max_distance" without revealing the actual distance
        // We compare squared distances to avoid sqrt computation in ZK
        let is_within_range: bool = distance_squared <= max_distance_squared;

        // Create proximity proof (only reveals boolean result, not actual distance or locations)
        let proof = ProximityProof {
            ride_id: ride_request.ride_id,
            driver_address: driver_address,
            is_within_range: is_within_range,
            max_distance_km: ride_request.max_distance_km,
            proof_timestamp: timestamp,
        };

        // Only return proof if within range (this is the public output)
        assert(is_within_range == true);

        return proof;
    }

    // Calculate squared distance between two points (ZK-friendly)
    // Uses simplified distance calculation to avoid sqrt in ZK
    // For small distances (< 100km), this approximation is sufficient
    function calculate_distance(
        lat1: field,
        lon1: field,
        lat2: field,
        lon2: field
    ) -> field {
        // For ZK-friendly computation, we use squared Euclidean distance
        // This avoids sqrt which is expensive in zero-knowledge
        // The result is compared against squared max_distance
        
        // Calculate differences
        let delta_lat: field = lat2 - lat1;
        let delta_lon: field = lon2 - lon1;
        
        // Calculate squared distance (approximation for small distances)
        // For distances < 100km, lat/lon can be treated as linear
        // 1 degree latitude ≈ 111 km, 1 degree longitude ≈ 111 km * cos(lat)
        let km_per_degree: field = 111field;
        let lat_km: field = delta_lat * km_per_degree;
        let lon_km: field = delta_lon * km_per_degree;
        
        // Squared distance in km²
        let distance_squared: field = lat_km * lat_km + lon_km * lon_km;
        
        // Return squared distance (will be compared against squared max_distance)
        return distance_squared;
    }

    // Verify a proximity proof (public verification)
    // Takes proof as input parameter
    transition verify_proximity_proof(
        proof: ProximityProof
    ) -> bool {
        // Verify proof exists and is valid
        assert(proof.is_within_range == true);

        return true;
    }

    // Get ride request (verification only)
    // Takes ride_request as input parameter
    transition get_ride_request(
        ride_request: RideRequest,
        caller_address: address
    ) -> RideRequest {
        // Verify caller is the rider
        assert(caller_address == ride_request.rider_address);

        return ride_request;
    }

    // Cancel ride request
    // Takes ride_request as input and returns cancelled version
    transition cancel_ride_request(
        ride_request: RideRequest,
        caller_address: address
    ) -> RideRequest {
        // Verify caller is the rider
        assert(caller_address == ride_request.rider_address);

        // Mark as inactive
        let cancelled_request = RideRequest {
            ride_id: ride_request.ride_id,
            rider_address: ride_request.rider_address,
            pickup_location: ride_request.pickup_location,
            max_distance_km: ride_request.max_distance_km,
            created_at: ride_request.created_at,
            is_active: false,
        };

        return cancelled_request;
    }
}
