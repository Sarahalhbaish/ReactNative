import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
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
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.uploadButton}>
          <Image
            source={require("../../assets/Questions-pana.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <TextInput
          style={styles.input}
          placeholder="Post title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Post description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Post</Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  uploadButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    padding: 16,
    gap: 16,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CreateItem;
