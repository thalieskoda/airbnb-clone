import { defaultStyles } from "@/constants/styles";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
  listing: {
    coordinates: { latitude: number; longitude: number };
    id: number;
    price: number;
  }[];
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

export const ListingsMaps = ({ listing }: Props) => {
  const router = useRouter();
  const onMarkerSelected = (item: Props["listing"][number]) => {
    router.push(`/listing/${item.id}`);
  };

  return (
    <View style={defaultStyles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton>
        {listing.map((item, index) => (
          <Marker
            onPress={() => onMarkerSelected(item)}
            key={index} // Using index as a key, update as needed
            coordinate={{
              latitude: +item.coordinates.latitude,
              longitude: +item.coordinates.longitude,
            }}>
            <View style={styles.marker}>
              <Text style={styles.markerText}>$ {item.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  marker: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      height: 10,
      width: 1,
    },
  },
  markerText: {},
});
