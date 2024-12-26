import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screen/Home";
import PostsDetail from "../screen/PostsDetail";
import AddComment from "../screen/AddComment"

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PostsDetail" component={PostsDetail} />
      <Stack.Screen name="AddComment" component={AddComment} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
