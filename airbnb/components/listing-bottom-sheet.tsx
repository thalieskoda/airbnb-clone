import { View, Text, Button } from "react-native";
import { useMemo } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { Listings } from "./listings";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
interface Props {
  listing: {
    coordinates: { latitude: number; longitude: number };
    id: number;
    price: number;
  }[];
  category: string;
}

export const ListingBottomSheet = ({ listing, category }: Props) => {
  const BottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const [refresh, setRefresh] = useState(0);
  const ShowMap = () => {
    BottomSheetRef.current?.collapse();
    //its counting up
    setRefresh(refresh + 1);
  };
  //index 1 because that's where it should initialy be open
  return (
    <BottomSheet
      style={styles.sheetContainer}
      ref={BottomSheetRef}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      enablePanDownToClose={false}
      index={1}>
      <View style={{ flex: 1 }}>
        <Listings listings={listing} category={category} refresh={refresh} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={ShowMap} style={styles.btn}>
            <Text style={{ color: "#fff" }}>Map</Text>
            <Ionicons name="map" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  absoluteBtn: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    padding: 16,
    borderRadius: 20,
    gap: 8,
  },
  sheetContainer: {
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
