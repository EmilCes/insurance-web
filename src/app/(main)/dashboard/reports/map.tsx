"use client"

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Tipo para las props del componente
interface LocationMapProps {
  onLocationSelect?: (latitude: number, longitude: number) => void;
  visible: boolean;
}

// Tipo para la posición
interface Position {
  latitude: number;
  longitude: number;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';

const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelect, visible }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const marker = useRef<Marker | null>(null);

  useEffect(() => {
    if (visible && !map.current && mapContainer.current) {
      // Inicializar mapa
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-74.5, 40],
        zoom: 9
      });

      // Crear marcador arrastrable
      marker.current = new mapboxgl.Marker({
        draggable: true
      });

      // Evento cuando el marcador termina de arrastrarse
      marker.current.on('dragend', () => {
        const lngLat = marker.current?.getLngLat();
        if (lngLat) {
          onLocationSelect?.(lngLat.lat, lngLat.lng);
        }
      });

      // Obtener ubicación actual
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            
            if (map.current) {
              // Actualizar ubicación del mapa
              map.current.flyTo({
                center: [longitude, latitude],
                zoom: 14
              });
            }

            // Actualizar marcador
            if (marker.current) {
              marker.current.setLngLat([longitude, latitude]).addTo(map.current!);
            }
            
            // Enviar ubicación al formulario
            onLocationSelect?.(latitude, longitude);
          },
          (error: GeolocationPositionError) => {
            console.error("Error getting location:", error);
            alert("No se pudo obtener la ubicación. Por favor, verifica los permisos.");
          }
        );
      } else {
        alert("Tu navegador no soporta geolocalización");
      }
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [visible, onLocationSelect]);

  if (!visible) return null;

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg overflow-hidden"
    />
  );
};

export default LocationMap;