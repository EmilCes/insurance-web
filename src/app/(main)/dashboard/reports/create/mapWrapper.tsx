// components/map/MapWrapper.tsx
"use client";

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

const LocationMap = dynamic(
  () => import('./map'),
  { ssr: false }
);

export type MapWrapperProps = ComponentProps<typeof LocationMap>;

export function MapWrapper(props: MapWrapperProps) {
  return <LocationMap {...props} />;
}