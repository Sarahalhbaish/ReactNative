import {
  Button,
  StyleSheet,
  TextInput,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isFetching, isSuccess } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const filteredData = searchQuery
    ? data?.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search posts..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="filter-outline" size={24} color="#333" />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.postsContainer}>
          {filteredData?.map((post) => (
            <TouchableOpacity
              key={post.id}
              style={styles.postCard}
              onPress={() => navigation.navigate("PostsDetail", post.id)}
            >
              <View style={styles.postContent}>
                <Text style={styles.postTitle} numberOfLines={2}>
                  {post.title}
                </Text>
                <Text style={styles.postDescription} numberOfLines={3}>
                  {post.description}
                </Text>
                <View style={styles.postFooter}>
                  <Text style={styles.commentCount}>comments</Text>
                  <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  postsContainer: {
    padding: 16,
    gap: 16,
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  postContent: {
    gap: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  postDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  commentCount: {
    fontSize: 14,
    color: "#666",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#007AFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Home;
