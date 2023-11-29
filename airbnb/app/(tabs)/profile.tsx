import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
const Page = () => {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  const [firstName, setFirsttName] = React.useState(user?.firstName);
  const [lastName, setLastName] = React.useState(user?.lastName);
  //In case the user has multiple email addresses
  const [email, setEmail] = React.useState(
    user?.emailAddresses[0].emailAddress
  );
  const [edit, setEdit] = React.useState(false);

  useEffect(() => {
    if (!user) return;

    setFirsttName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  const onSaveUser = async () => {
    if (!firstName || !lastName) return;
    try {
      await user?.update({
        firstName,
        lastName,
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setEdit(false);
    }
  };
  const onCaptureImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <Ionicons name="notifications-outline" size={26} />
        </View>

        {user && (
          <View style={styles.card}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={{ flexDirection: "row", marginRight: 6 }}>
              {edit ? (
                <View style={styles.editRow}>
                  <TextInput
                    placeholder="First Name"
                    value={firstName || ""}
                    onChangeText={setFirsttName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TextInput
                    placeholder="Last Name"
                    value={lastName || ""}
                    onChangeText={setLastName}
                    style={[defaultStyles.inputField, { width: 100 }]}
                  />
                  <TouchableOpacity onPress={onSaveUser}>
                    <Ionicons
                      name="checkmark-outline"
                      size={24}
                      color={Colors.dark}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.editRow}>
                  <Text style={{ fontSize: 22 }}>
                    {firstName} {lastName}
                  </Text>
                  <TouchableOpacity onPress={() => setEdit(true)}>
                    <Ionicons
                      name="create-outline"
                      size={24}
                      color={Colors.dark}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text>{email}</Text>
            <Text>Since {user.createdAt?.toLocaleDateString()}</Text>
          </View>
        )}
        {isSignedIn && (
          <Button
            title="log out"
            onPress={() => signOut()}
            color={Colors.dark}
          />
        )}
        {!isSignedIn && (
          <Link href={"/(modals)/login"} asChild>
            <Button title="log in" color={Colors.dark} />
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  header: {
    fontSize: 24,
  },
  card: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    alignItems: "center",
    height: 60,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    gap: 8,
  },
});
