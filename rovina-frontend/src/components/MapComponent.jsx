import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";

const MapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const branches = [
    {
      id: 1,
      name: "Head Office",
      address: "Roving House, 3 Mobil Road, Ile Epo Bus Stop, Satellite Town",
      phone: "07086986677, 08033590577",
      lat: 6.4969,
      lng: 3.3519,
    },
    {
      id: 2,
      name: "Abule Ado Branch",
      address: "Plot 446 Old Ojo Road, Christ-in-me Plaza, Satellite Town",
      phone: "08060909199",
      lat: 6.48,
      lng: 3.365,
    },
    {
      id: 3,
      name: "Olodi Apapa Branch",
      address: "Plot 174 Kirikiri Road, People's bus stop, Olodi Apapa",
      phone: "09139221666",
      lat: 6.5,
      lng: 3.34,
    },
  ];

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "12px",
  };

  const center = {
    lat: 6.488,
    lng: 3.3569,
  };

  const mapOptions = {
    zoom: 13,
    mapTypeControl: true,
    fullscreenControl: true,
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
    return (
      <div className="w-full h-96 bg-gray-300 rounded-xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 font-semibold mb-2">
            Google Maps API Key Required
          </p>
          <p className="text-gray-600 text-sm mb-4">
            To display the map, you need a Google Maps API key.
          </p>
          <div className="text-left text-xs text-gray-500 max-w-md">
            <p className="mb-2">Steps to get your API key:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Go to{" "}
                <a
                  href="https://console.cloud.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Google Cloud Console
                </a>
              </li>
              <li>Create a new project or select existing</li>
              <li>Enable "Maps JavaScript API"</li>
              <li>Create credentials (API Key)</li>
              <li>
                Replace{" "}
                <code className="bg-gray-200 px-1 rounded">
                  YOUR_GOOGLE_MAPS_API_KEY_HERE
                </code>{" "}
                in .env.local
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={mapOptions}
      >
        {branches.map((branch) => (
          <Marker
            key={branch.id}
            position={{ lat: branch.lat, lng: branch.lng }}
            onClick={() => setSelectedMarker(branch)}
            title={branch.name}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="max-w-xs">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                {selectedMarker.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {selectedMarker.address}
              </p>
              <p className="text-sm text-primary font-semibold">
                {selectedMarker.phone}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
