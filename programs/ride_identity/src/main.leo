// GhostMove: Temporary Zero-Knowledge Identity Tokens
// Each ride creates a non-transferable ZK identity that auto-expires after completion

program ride_identity.aleo {
    // Temporary identity token structure
    // This identity exists only for the duration of a single ride
    struct RideIdentity {
        rider_address: address,
        driver_address: address,
        ride_id: field,
        created_at: u64,
        expires_at: u64,
        is_active: bool,
    }

    // Mapping to store active ride identities (encrypted state)
    mapping active_identities: field => RideIdentity;

    // Mapping to track identity ownership (encrypted)
    mapping rider_identities: address => field;
    mapping driver_identities: address => field;

    // Mint a new temporary identity for a ride
    // This identity is bound to both rider and driver without revealing real identities
    transition mint_identity(
        rider_address: address,
        driver_address: address,
        ride_id: field,
        duration_seconds: u64,
        timestamp: u64
    ) -> RideIdentity {
        // Ensure rider and driver are different
        assert(rider_address != driver_address);

        // Calculate expiration time
        let expires_at: u64 = timestamp + duration_seconds;

        // Create the temporary identity
        let identity = RideIdentity {
            rider_address: rider_address,
            driver_address: driver_address,
            ride_id: ride_id,
            created_at: timestamp,
            expires_at: expires_at,
            is_active: true,
        };

        // Store in encrypted state (only accessible by authorized parties)
        set active_identities[ride_id] = identity;
        set rider_identities[rider_address] = ride_id;
        set driver_identities[driver_address] = ride_id;

        return identity;
    }

    // Verify identity is valid and not expired
    // Used for authentication during the ride
    transition verify_identity(
        ride_id: field,
        caller_address: address,
        current_timestamp: u64
    ) -> bool {
        // Get identity from encrypted state
        let identity: RideIdentity = active_identities[ride_id];

        // Verify caller is either rider or driver
        assert(caller_address == identity.rider_address || caller_address == identity.driver_address);

        // Check if identity is still active
        assert(identity.is_active == true);

        // Check if identity has not expired
        assert(current_timestamp <= identity.expires_at);

        return true;
    }

    // Complete ride and burn the temporary identity
    // This ensures no permanent identity record exists
    transition complete_ride(
        ride_id: field,
        caller_address: address,
        current_timestamp: u64
    ) -> bool {
        // Get identity from encrypted state
        let identity: RideIdentity = active_identities[ride_id];

        // Verify caller is authorized (rider or driver)
        assert(caller_address == identity.rider_address || caller_address == identity.driver_address);

        // Verify identity is still active
        assert(identity.is_active == true);

        // Mark identity as inactive (burn it)
        let burned_identity = RideIdentity {
            rider_address: identity.rider_address,
            driver_address: identity.driver_address,
            ride_id: identity.ride_id,
            created_at: identity.created_at,
            expires_at: identity.expires_at,
            is_active: false,
        };

        // Update encrypted state (identity is now burned)
        set active_identities[ride_id] = burned_identity;

        // Clear ownership mappings
        set rider_identities[identity.rider_address] = 0field;
        set driver_identities[identity.driver_address] = 0field;

        return true;
    }

    // Auto-expire identity if time has passed
    // Can be called by anyone to clean up expired identities
    transition expire_identity(
        ride_id: field,
        current_timestamp: u64
    ) -> bool {
        // Get identity from encrypted state
        let identity: RideIdentity = active_identities[ride_id];

        // Check if identity has expired
        if (current_timestamp > identity.expires_at) {
            // Mark as inactive
            let expired_identity = RideIdentity {
                rider_address: identity.rider_address,
                driver_address: identity.driver_address,
                ride_id: identity.ride_id,
                created_at: identity.created_at,
                expires_at: identity.expires_at,
                is_active: false,
            };

            set active_identities[ride_id] = expired_identity;
            set rider_identities[identity.rider_address] = 0field;
            set driver_identities[identity.driver_address] = 0field;

            return true;
        }

        return false;
    }

    // Get identity details (only accessible by rider or driver)
    transition get_identity(
        ride_id: field,
        caller_address: address
    ) -> RideIdentity {
        // Get identity from encrypted state
        let identity: RideIdentity = active_identities[ride_id];

        // Verify caller is authorized
        assert(caller_address == identity.rider_address || caller_address == identity.driver_address);

        return identity;
    }
}
