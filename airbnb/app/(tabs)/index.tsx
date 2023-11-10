import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/123"}>Listing details</Link>

    </View>
  );
};

export default Page;
