import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type LatLng = { latitude: number; longitude: number };

type MarkerItem = {
  latlng: LatLng;
  title?: string;
  description?: string;
};

type MapScreenProps = {
  markers?: MarkerItem[];
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
};

export default function MapScreen({ markers = [], initialRegion }: MapScreenProps) {
  const fallbackRegion = useMemo(
    () => ({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }),
    []
  );
  const [region, setRegion] = useState(initialRegion ?? fallbackRegion);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChange={setRegion}>
        {markers.map((marker, index) => (
          <Marker
            key={`${marker.latlng.latitude}-${marker.latlng.longitude}-${index}`}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
