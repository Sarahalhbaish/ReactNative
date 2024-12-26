import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addCommentById } from "../api/posts";

const AddComment = ({ route }) => {
  const id = route.params;
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const mutation = useMutation({
    mutationKey: ["createComment"],
    mutationFn: (newData) => addCommentById(id, newData),
  });

  const handleSubmit = () => {
    mutation.mutate({
      username: username,
      comment: comment,
    });
    console.log("created");
  };
  return (
    <View>
      <TextInput
        placeholder="Edit your username"
        onChangeText={(newText) => setUsername(newText)}
      />
      <TextInput
        placeholder="Edit your comment"
        onChangeText={(newText) => setComment(newText)}
      />
      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
};

export default AddComment;
