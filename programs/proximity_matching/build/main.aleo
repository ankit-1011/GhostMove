program proximity_matching.aleo;

struct Location:
    latitude as field;
    longitude as field;

struct ProximityProof:
    ride_id as field;
    driver_address as address;
    is_within_range as boolean;
    max_distance_km as u32;
    proof_timestamp as u64;

struct RideRequest:
    ride_id as field;
    rider_address as address;
    pickup_location as Location;
    max_distance_km as u32;
    created_at as u64;
    is_active as boolean;

function create_ride_request:
    input r0 as field.private;
    input r1 as address.private;
    input r2 as field.private;
    input r3 as field.private;
    input r4 as u32.private;
    input r5 as u64.private;
    cast r2 r3 into r6 as Location;
    cast r0 r1 r6 r4 r5 true into r7 as RideRequest;
    output r7 as RideRequest.private;

closure calculate_distance:
    input r0 as field;
    input r1 as field;
    input r2 as field;
    input r3 as field;
    sub r2 r0 into r4;
    sub r3 r1 into r5;
    mul r4 111field into r6;
    mul r5 111field into r7;
    mul r6 r6 into r8;
    mul r7 r7 into r9;
    add r8 r9 into r10;
    output r10 as field;

function prove_proximity:
    input r0 as RideRequest.private;
    input r1 as address.private;
    input r2 as field.private;
    input r3 as field.private;
    input r4 as u64.private;
    is.eq r0.is_active true into r5;
    assert.eq r5 true;
    call calculate_distance r0.pickup_location.latitude r0.pickup_location.longitude r2 r3 into r6;
    cast r0.max_distance_km into r7 as field;
    cast r0.max_distance_km into r8 as field;
    mul r7 r8 into r9;
    lte r6 r9 into r10;
    cast r0.ride_id r1 r10 r0.max_distance_km r4 into r11 as ProximityProof;
    is.eq r10 true into r12;
    assert.eq r12 true;
    output r11 as ProximityProof.private;

function verify_proximity_proof:
    input r0 as ProximityProof.private;
    is.eq r0.is_within_range true into r1;
    assert.eq r1 true;
    output true as boolean.private;

function get_ride_request:
    input r0 as RideRequest.private;
    input r1 as address.private;
    is.eq r1 r0.rider_address into r2;
    assert.eq r2 true;
    output r0 as RideRequest.private;

function cancel_ride_request:
    input r0 as RideRequest.private;
    input r1 as address.private;
    is.eq r1 r0.rider_address into r2;
    assert.eq r2 true;
    cast r0.ride_id r0.rider_address r0.pickup_location r0.max_distance_km r0.created_at false into r3 as RideRequest;
    output r3 as RideRequest.private;

constructor:
    assert.eq edition 0u16;
