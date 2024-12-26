import { View, TouchableOpacity, Text, Button } from "react-native";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "../api/posts";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { deleteCommentById } from "../api/posts";
import { deletePostById } from "../api/posts";

const PostsDetail = ({ route }) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const id = route.params;
  //   const [username, setUsername] = useState("");
  //   const [comment, setComment] = useState("");

  console.log("id", id);
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });

  const mutation = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: (commentId) => deleteCommentById(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const handleDelete = (commentId) => {
    console.log("Deleteing ", commentId);
    mutation.mutate(commentId);
    alert("deleted");
  };
  console.log("getPostById", data);

  return (
    <View>
      <Text>{data?.title}</Text>
      {data?.comments?.map((comment) => (
        <View key={comment.id}>
          <Text>{comment.username}</Text>
          <Text>{comment.comment}</Text>
          <Button
            title="Delete comment"
            onPress={() => handleDelete(comment.id)}
          />
        </View>
      ))}
      <Button
        title="Create comment"
        onPress={() => navigation.navigate("AddComment", id)}
      />
      {/* <Button title="Delete comment" onPress={handleDelete} /> */}
      <Button title="Delete post" />
    </View>
  );
};

export default PostsDetail;
