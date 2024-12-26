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

  console.log("id", id);
  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostById(id),
  });

  const commentMutation = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: (commentId) => deleteCommentById(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const postMutation = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: (id) => deletePostById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigation.goBack();
    },
  });
  const handleCommentDelete = (commentId) => {
    console.log("Deleteing ", commentId);
    commentMutation.mutate(commentId);
  };
  const handlePostDelete = () => {
    console.log("Deleteing ", id);
    postMutation.mutate(id);
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
            onPress={() => handleCommentDelete(comment.id)}
          />
        </View>
      ))}
      <Button
        title="Create comment"
        onPress={() => navigation.navigate("AddComment", id)}
      />
      <Button title="Delete post" onPress={() => handlePostDelete(id)} />
    </View>
  );
};

export default PostsDetail;
