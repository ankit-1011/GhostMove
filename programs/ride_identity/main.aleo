program ride_identity.aleo;

struct RideIdentity:
    rider_address as address;
    driver_address as address;
    ride_id as field;
    created_at as u64;
    expires_at as u64;
    is_active as boolean;

function initialize:

function mint_identity:
    input r0 as address.private;
    input r1 as address.private;
    input r2 as field.private;
    input r3 as u64.private;
    input r4 as u64.private;
    is.neq r0 r1 into r5;
    assert.eq r5 true;
    add r4 r3 into r6;
    cast r0 r1 r2 r4 r6 true into r7 as RideIdentity;
    output r7 as RideIdentity.private;

function verify_identity:
    input r0 as RideIdentity.private;
    input r1 as address.private;
    input r2 as u64.private;
    is.eq r1 r0.rider_address into r3;
    is.eq r1 r0.driver_address into r4;
    or r3 r4 into r5;
    assert.eq r5 true;
    is.eq r0.is_active true into r6;
    assert.eq r6 true;
    lte r2 r0.expires_at into r7;
    assert.eq r7 true;
    output true as boolean.private;

function complete_ride:
    input r0 as RideIdentity.private;
    input r1 as address.private;
    input r2 as u64.private;
    is.eq r1 r0.rider_address into r3;
    is.eq r1 r0.driver_address into r4;
    or r3 r4 into r5;
    assert.eq r5 true;
    is.eq r0.is_active true into r6;
    assert.eq r6 true;
    cast r0.rider_address r0.driver_address r0.ride_id r0.created_at r0.expires_at false into r7 as RideIdentity;
    output r7 as RideIdentity.private;

function expire_identity:
    input r0 as RideIdentity.private;
    input r1 as u64.private;
    gt r1 r0.expires_at into r2;
    cast r0.rider_address r0.driver_address r0.ride_id r0.created_at r0.expires_at false into r3 as RideIdentity;
    ternary r2 r3.rider_address r0.rider_address into r4;
    ternary r2 r3.driver_address r0.driver_address into r5;
    ternary r2 r3.ride_id r0.ride_id into r6;
    ternary r2 r3.created_at r0.created_at into r7;
    ternary r2 r3.expires_at r0.expires_at into r8;
    ternary r2 r3.is_active r0.is_active into r9;
    cast r4 r5 r6 r7 r8 r9 into r10 as RideIdentity;
    output r10 as RideIdentity.private;

function get_identity:
    input r0 as RideIdentity.private;
    input r1 as address.private;
    is.eq r1 r0.rider_address into r2;
    is.eq r1 r0.driver_address into r3;
    or r2 r3 into r4;
    assert.eq r4 true;
    output r0 as RideIdentity.private;
