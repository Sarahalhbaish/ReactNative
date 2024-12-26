import { View, Text, SafeAreaView, StyleSheet, Image } from "react-native";
import React from "react";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/Profile pic-pana.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Profile</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Profile;
