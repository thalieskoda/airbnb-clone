import { defaultStyles } from "@/constants/styles";
import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { BottomSheetFlatList, BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";

interface Props {
  listings: any[]; //Listing data
  category: string;
  refresh: number;
}
export const Listings = ({ listings: items, category, refresh }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);
  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
    console.log("refreshlisting");
  }, [refresh]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Result> = ({ item }) => {
    return (
      <Link
        href={`/listing/${item.id}`}
        asChild
        style={{ backgroundColor: "whitesmoke", margin: 10 }}>
        <TouchableOpacity>
          <Animated.View
            style={styles.listing}
            entering={FadeInRight}
            exiting={FadeOutLeft}>
            <Image source={{ uri: item.medium_url }} style={styles.image} />
            <TouchableOpacity
              style={{ position: "absolute", right: 30, top: 30 }}>
              <Ionicons name="heart-outline" size={24} color={"#000"} />
            </TouchableOpacity>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 16 }}>{item.name}</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 4,
                }}>
                <Ionicons name="star" size={16} />
                <Text>{item.review_scores_rating / 20}</Text>
              </View>
            </View>
            <Text style={{}}>{item.room_type}</Text>
            <View style={{ flexDirection: "row", gap: 4 }}>
              <Text>$ {item.price}</Text>
              <Text>night</Text>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
        ListHeaderComponent={
          <Text style={styles.info}>checkout the airbnb!</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
  info: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 4,
  },
});
