import { View, Text, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const DeleteComment = ({ route }) => {
  const id = route.params;
  const [comment, setComment] = useState("");
  const mutation = useMutation({
    mutationKey: ["createComment"],
    mutationFn: (newData) => deleteCommentById(id, newData),
  });

  const handleSubmit = () => {
    mutation.mutate({
      comment: comment,
    });
    console.log("created");
  };
  return (
    <View>
     
      <TextInput
        placeholder="Edit your comment"
        onChangeText={(newText) => setComment(newText)}
      />
      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
};

export default DeleteComment;
