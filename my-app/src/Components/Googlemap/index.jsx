

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios"; // For API call

const containerStyle = {
    width: "100%",
    height: "500px",
};

const defaultCenter = {
    lat: 23.8103, // Default center: Dhaka
    lng: 90.4125,
};

const GoogleMapComponent = () => {
    const [locations, setLocations] = useState([]); // Locations state

    // Fetch location data from API
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/landingcards") // The API endpoint where your data is
            .then((response) => {
                if (response.data && response.data.data.length > 0) {
                    // Update state with the array of locations
                    const locationsData = response.data.data.map((item) => ({
                        title: item.title,
                        latitude: parseFloat(item.latitude),
                        longitude: parseFloat(item.longitude),
                    }));

                    setLocations(locationsData);
                } else {
                    console.warn("⚠ No location data found!");
                }
            })
            .catch((error) => {
                console.error("❌ Error fetching location data:", error);
            });
    }, []);

    return (
        <LoadScript googleMapsApiKey="AIzaSyDuVOgr6Bct64L6ZpRwSjHoGQ5xQWIej-8">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={7} // Adjust zoom level based on your needs
            >
                {locations.map((location, index) => (
                    <Marker
                        key={index}
                        position={{ lat: location.latitude, lng: location.longitude }}
                        title={location.title} // Display title when hovering over marker
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;

