import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { BlurView } from "expo-blur";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
} from "react-native-reanimated";
import { defaultStyles } from "@/constants/styles";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { places } from "@/assets/data/places";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const Page = () => {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);

  const onClearAll = () => {
    setSelectedPlace(0);
    setOpenCard(0);
  };
  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/*WHERE*/}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 0 && (
          <>
            <Text style={styles.cardHeader}>Where to?</Text>
            <Animated.View style={styles.cardBody}>
              <View style={styles.searchSection}>
                <Ionicons
                  style={styles.searchIcon}
                  name="ios-search"
                  size={20}
                  color="#fff"
                />
                <TextInput
                  style={styles.inputField}
                  placeholder="Search destination"
                  placeholderTextColor={Colors.grey}></TextInput>
              </View>
            </Animated.View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                gap: 25,
                paddingLeft: 10,
                marginBottom: 30,
                paddingRight: 10,
              }}>
              {places.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPlace(index)}>
                  <Image
                    source={item.img}
                    style={
                      selectedPlace === index
                        ? styles.placeSelected
                        : styles.place
                    }
                  />
                  <Text style={{ paddingTop: 6 }}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </>
        )}
      </View>

      {/*WHEN*/}

      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 1 && (
          <>
            <Text style={styles.cardHeader}>When's your trip</Text>
            <Animated.View style={styles.cardBody}></Animated.View>
          </>
        )}
      </View>

      {/*WHO*/}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}>
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guess</Text>
          </AnimatedTouchableOpacity>
        )}

        {openCard === 2 && (
          <>
            <Text style={styles.cardHeader}>Who's coming</Text>
            <Animated.View style={styles.cardBody}></Animated.View>
          </>
        )}
      </View>
      {/*footer*/}
      <Animated.View
        style={defaultStyles.footer}
        entering={SlideInDown.delay(200)}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <TouchableOpacity
            onPress={onClearAll}
            style={{ justifyContent: "center" }}>
            <Text style={{ fontSize: 18, textDecorationLine: "underline" }}>
              Clear All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}>
            <Ionicons
              name="search-outline"
              size={24}
              color="#fff"
              style={defaultStyles.btnIcon}
            />
            <Text style={[defaultStyles.btnText]}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 20,
  },
  cardHeader: {
    fontFamily: "mon-b",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  previewText: {
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontSize: 14,
    color: Colors.dark,
  },
  searchSection: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.grey,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    marginBottom: 14,
  },
  inputField: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  searchIcon: {
    padding: 10,
  },
  placeSelected: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  place: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
