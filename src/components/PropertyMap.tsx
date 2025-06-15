
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PropertyMapProps {
  address: string;
}

const PropertyMap = ({ address }: PropertyMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [tokenEntered, setTokenEntered] = useState(false);

  const handleTokenSubmit = () => {
    if (accessToken.trim()) {
      localStorage.setItem('mapbox_token', accessToken);
      setTokenEntered(true);
      initializeMap(accessToken);
    }
  };

  const initializeMap = async (token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      mapboxgl.accessToken = token;
      
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${token}`
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
      setError('An error occurred while fetching the location. Please check your token.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setAccessToken(savedToken);
      setTokenEntered(true);
      initializeMap(savedToken);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [address]);

  if (!tokenEntered) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle>Map Configuration Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            To display the map, please enter your Mapbox public access token. 
            You can get one for free from{' '}
            <a 
              href="https://www.mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="space-y-2">
            <Label htmlFor="token">Mapbox Access Token</Label>
            <Input
              id="token"
              type="text"
              placeholder="pk.eyJ1..."
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
            />
          </div>
          <Button onClick={handleTokenSubmit} disabled={!accessToken.trim()}>
            Load Map
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center animate-pulse">Loading map...</div>;
  }

  if (error) {
    return (
      <div className="h-96 bg-red-100 text-red-700 rounded-lg flex items-center justify-center p-4 text-center">
        <div>
          <p>{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => {
              localStorage.removeItem('mapbox_token');
              setTokenEntered(false);
              setAccessToken('');
            }}
          >
            Reset Token
          </Button>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="h-96 rounded-lg" />;
};

export default PropertyMap;
