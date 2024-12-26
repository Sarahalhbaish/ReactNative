import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addCommentById } from "../api/posts";
import { useNavigation } from "@react-navigation/native";

const AddComment = ({ route }) => {
  const navigation = useNavigation();
  const id = route.params;
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const mutation = useMutation({
    mutationKey: ["createComment"],
    mutationFn: (newData) => addCommentById(id, newData),
    onSuccess: () => {
      navigation.navigate("PostsDetail", id);
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      username: username,
      comment: comment,
    });
    console.log("created");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Your username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={[styles.input, styles.commentInput]}
        placeholder="Write your comment"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  commentInput: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default AddComment;
