
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// IMPORTANT: You need to replace this with your own Mapbox public access token.
// You can get a token for free from https://www.mapbox.com/
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

interface PropertyMapProps {
  address: string;
}

const PropertyMap = ({ address }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapboxgl.accessToken || mapboxgl.accessToken === 'YOUR_MAPBOX_ACCESS_TOKEN') {
      console.error("Mapbox access token is not set. Please replace 'YOUR_MAPBOX_ACCESS_TOKEN' in PropertyMap.tsx.");
      setError("Map configuration error. An access token is required.");
      setLoading(false);
      return;
    }

    const geocodeAddress = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          const [longitude, latitude] = data.features[0].center;
          
          if (map.current || !mapContainer.current) return;
          
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 14
          });

          new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .addTo(map.current);
            
          map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

        } else {
          setError('Could not find location for the address.');
        }
      } catch (err) {
        console.error('Geocoding error:', err);
        setError('An error occurred while fetching the location.');
      } finally {
        setLoading(false);
      }
    };
    
    geocodeAddress();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [address]);

  if (loading) {
    return <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">Loading map...</div>;
  }

  if (error) {
    return <div className="h-96 bg-red-100 text-red-700 rounded-lg flex items-center justify-center p-4 text-center">{error}</div>;
  }

  return <div ref={mapContainer} className="h-96 rounded-lg" />;
};

export default PropertyMap;
