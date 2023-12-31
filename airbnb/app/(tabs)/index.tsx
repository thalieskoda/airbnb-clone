import { Stack, Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { ExploreHeader } from "@/components/exploreHeader";
import { Listings } from "@/components/listings";
import { useState } from "react";
import { useMemo } from "react";
import {airbnbData} from "../../assets/data/dummyData.js";
import { ListingsMaps } from "../../components/listings-map";
import { ListingBottomSheet } from "../../components/listing-bottom-sheet";

const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
// when the page reloads, it memorizes the data
  const items = useMemo(()=> airbnbData as any, []);
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop:80}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMaps listing={items} />
      <ListingBottomSheet listing={items} category={category}/>
    </View>
  );
};

export default Page;
