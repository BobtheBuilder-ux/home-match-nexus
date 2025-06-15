
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Property } from "@/types/property";

export const usePropertyDetail = (id: string | undefined) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        console.log('Fetching property with ID:', id);
        const propertyRef = doc(db, 'properties', id);
        const propertySnap = await getDoc(propertyRef);
        
        if (propertySnap.exists()) {
          const propertyData = { id: propertySnap.id, ...propertySnap.data() } as Property;
          console.log('Property response:', propertyData);
          setProperty(propertyData);
        } else {
          console.log('Property not found');
          setProperty(null);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  return { property, loading };
};
