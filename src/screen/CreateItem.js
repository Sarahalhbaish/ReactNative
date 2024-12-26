import { StyleSheet, Image, Text, View, Button, TextInput } from "react-native";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addPost } from "../api/posts";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (newData) => addPost(newData),
  });
  const handleSubmit = () => {
    mutation.mutate({
      title: title,
      description: description,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}></View>

      <View style={styles.detailsContainer}>
        <TextInput
          placeholder="Edit your last name"
          onChangeText={(newText) => setTitle(newText)}
        />
        <TextInput
          placeholder="Edit your last name"
          onChangeText={(newText) => setDescription(newText)}
        />
      </View>
      <Button title="Create Post" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  detailsContainer: {
    alignItems: "center",
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: "500",
    color: "#007AFF",
  },
});

export default CreateItem;
