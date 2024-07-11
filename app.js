const EARTH_RADIUS = 6371;

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    try {
        // Convert to radians
        lat1 = toRadians(lat1);
        lon1 = toRadians(lon1);
        lat2 = toRadians(lat2);
        lon2 = toRadians(lon2);

        // Calculate differences
        const dlat = lat2 - lat1;
        const dlon = lon2 - lon1;

        // Calculate the distance using Haversine formula
        const a = Math.pow(Math.sin(dlat / 2), 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.pow(Math.sin(dlon / 2), 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = EARTH_RADIUS * c;

        return parseFloat(distance.toFixed(2));
    } catch (error) {
        console.error("Error calculating distance:", error);
        return null;
    }
}

document.getElementById('distanceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from form
    const ruleLatitude = parseFloat(document.getElementById('ruleLatitude').value);
    const ruleLongitude = parseFloat(document.getElementById('ruleLongitude').value);
    const extLatitude = parseFloat(document.getElementById('extLatitude').value);
    const extLongitude = parseFloat(document.getElementById('extLongitude').value);
    const radius = parseFloat(document.getElementById('radius').value);

    // Calculate distance
    const distance = calculateDistance(ruleLatitude, ruleLongitude, extLatitude, extLongitude);

    // Check if within radius
    const isWithinRadius = distance <= radius;

    // Display result
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `Distance: ${distance} km<br>`;
    resultElement.innerHTML += `Within Radius: ${isWithinRadius ? 'Yes' : 'No'}`;
});


// Function to get current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById('currentLatitude').textContent = latitude.toFixed(6);
                document.getElementById('currentLongitude').textContent = longitude.toFixed(6);
            },
            function(error) {
                console.error("Error getting current location:", error);
                alert("Error getting current location. Please allow location access.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

document.getElementById('getCurrentLocation').addEventListener('click', getCurrentLocation);