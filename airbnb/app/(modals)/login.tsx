import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { defaultStyles } from "../../constants/styles";
import Colors from "@/constants/Colors";

const Page = () => {
  //Make sure that it's fine on end routes
  useWarmUpBrowser();
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="email"
        style={[defaultStyles.inputField]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.seperatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.seperator}>or</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: "#FFF",
  },
  seperatorView: {
    flexDirection: "row",
    marginVertical: 30,
  },
  seperator: {
    color: Colors.grey,
    gap: 10,
    alignItems: "center",
  },
});
export default Page;
