import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
export const ModalHeaderText = () => {
  const [active, setActive] = useState(0);
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontSize: 18,
            color: active === 0 ? "#000" : Colors.grey,
            textDecorationLine: active === 0 ? "underline" : "none",
          }}>
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={{
            fontSize: 18,
            color: active === 1 ? "#000" : Colors.grey,
            textDecorationLine: active === 1 ? "underline" : "none",
          }}>
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
});
