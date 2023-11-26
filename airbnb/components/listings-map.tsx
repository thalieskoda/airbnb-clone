import { defaultStyles } from "@/constants/styles";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
  listing: any;
}
interface ListingGeo {
  type: string;
  latitude: number;
  longitude: number;
  coordinates: number;
}
const INITIAL_REIGON = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

export const ListingsMaps = ({ listing }: Props) => {
    const onMarkerSelected = (event:any) => {
console.log(event);

    }
  return (
    <View style={defaultStyles.container}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REIGON}
        showsUserLocation
        showsMyLocationButton>
        {listing.map((item: typeof listing) => {
          <Marker
         onPress={() =>onMarkerSelected(item)}
          key={item.id}
            coordinate={{
              latitude: +item.coordinates.latitude,
              longitude: +item.coordinates.longitude,
            // latitude: 37,
            // longitude: -122
            }}
          />;
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
