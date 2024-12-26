import { View, TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostById } from "../api/posts";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { deleteCommentById } from "../api/posts";
import { deletePostById } from "../api/posts";
import Ionicons from "@expo/vector-icons/Ionicons";

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
    <View style={styles.container}>
      <Text style={styles.title}>{data?.title}</Text>
      <View style={styles.commentsContainer}>
        {data?.comments?.map((comment) => (
          <View key={comment.id} style={styles.commentCard}>
            <View style={styles.commentHeader}>
              <Text style={styles.username}>{comment.username}</Text>
              <TouchableOpacity onPress={() => handleCommentDelete(comment.id)}>
                <Ionicons name="trash-outline" size={30} color="#FF3B30" />
              </TouchableOpacity>
            </View>
            <Text style={styles.commentText}>{comment.comment}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.navigate("AddComment", id)}
        >
          <Text style={styles.buttonText}>Add Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handlePostDelete(id)}
        >
          <Text style={styles.buttonText}>Delete Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  commentsContainer: {
    flex: 1,
    gap: 12,
  },
  commentCard: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 12,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  username: {
    fontWeight: "600",
    color: "#333",
  },
  commentText: {
    color: "#666",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 16,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#007AFF",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  deleteButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
});

export default PostsDetail;
