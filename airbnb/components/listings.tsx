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
interface Props {
  listings: any[]; //Listing data
  category: string;
}
export const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("RELOAD LISTING:", items.length);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Result> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.listing}>
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
          </View>
        </TouchableOpacity>
      </Link>
    );
  };
  return (
    <View style={defaultStyles.container}>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
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
});
