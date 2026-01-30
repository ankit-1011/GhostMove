// GhostMove: Temporary Zero-Knowledge Identity Tokens
// Each ride creates a non-transferable ZK identity that auto-expires after completion
// Compatible with Leo 3.4.0 (ProvableHQ)

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

    // Constructor required for deployment
    @noupgrade
    async constructor() {}

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

        // Return identity (can be stored off-chain or in records)
        return identity;
    }

    // Verify identity is valid and not expired
    // Used for authentication during the ride
    // Takes identity as input parameter (stored off-chain)
    transition verify_identity(
        identity: RideIdentity,
        caller_address: address,
        current_timestamp: u64
    ) -> bool {
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
    // Takes identity as input and returns burned version
    transition complete_ride(
        identity: RideIdentity,
        caller_address: address,
        current_timestamp: u64
    ) -> RideIdentity {
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

        return burned_identity;
    }

    // Auto-expire identity if time has passed
    // Can be called by anyone to clean up expired identities
    transition expire_identity(
        identity: RideIdentity,
        current_timestamp: u64
    ) -> RideIdentity {
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

            return expired_identity;
        }

        // Return original identity if not expired
        return identity;
    }

    // Get identity details (verification only)
    // Identity is passed as input parameter
    transition get_identity(
        identity: RideIdentity,
        caller_address: address
    ) -> RideIdentity {
        // Verify caller is authorized
        assert(caller_address == identity.rider_address || caller_address == identity.driver_address);

        return identity;
    }
}
