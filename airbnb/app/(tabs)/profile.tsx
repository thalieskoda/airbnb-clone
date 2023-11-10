import { useAuth } from "@clerk/clerk-expo";
import { Link, Tabs } from "expo-router";
import React from "react";
import { View, Text, Button } from "react-native";
const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <View>
      <Button title="log out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
};

export default Page;
