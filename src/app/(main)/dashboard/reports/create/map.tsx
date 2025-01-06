"use client"

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Tipo para las props del componente
interface LocationMapProps {
  onLocationSelect?: (latitude: number, longitude: number) => void;
  initialLatitude?: number;
  initialLongitude?: number;
  readOnly?: boolean;
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';

const LocationMap: React.FC<LocationMapProps> = ({ onLocationSelect, initialLatitude, initialLongitude, readOnly = false }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);
  const marker = useRef<Marker | null>(null);

  useEffect(() => {
    if (!map.current && mapContainer.current) {
      // Inicializar mapa
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLongitude || -74.5, initialLatitude || 40],
        zoom: 9
      });

      // Crear marcador arrastrable
      marker.current = new mapboxgl.Marker({
        draggable: !readOnly
      })
        .setLngLat([initialLongitude || -74.5, initialLatitude || 40])
        .addTo(map.current);

      if (!readOnly) {
        marker.current.on('dragend', () => {
          const lngLat = marker.current?.getLngLat();
          if (lngLat) {
            onLocationSelect?.(lngLat.lat, lngLat.lng);
          }
        });


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
      } else {
        if (map.current) {
          map.current.setCenter([initialLongitude || -74.5, initialLatitude || 50]);
          map.current.setZoom(14);
        }
      }
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [onLocationSelect, initialLatitude, initialLongitude, readOnly]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-full rounded-lg overflow-hidden"
    />
  );
};

export default LocationMap;