import instance from "./index.js";

async function getPosts() {
  const data = await instance.get("/posts");
  console.log("data", data);
  return data;
}

async function getPostById(id) {
  const data = await instance.get(`/posts/${id}`);
  console.log("getPostById", data);
  return data;
}

async function addPost(newData) {
  console.log("Im here !");
  const data = await instance.post("/posts", newData);
  console.log("data", data);
  return data;
}

async function deletePostById(id) {
  const data = await instance.delete(`/posts/${id}`);
  console.log("deletePostById", data);
  return data;
}

async function addCommentById(id, newData) {
  const data = await instance.post(`/posts/${id}/comments`, newData);
  console.log("data", data);
  return data;
}

async function deleteCommentById(id) {
  const data = await instance.delete(`/posts/comments/${id}`);
  console.log("data", data);
  return data;
}

export {
  getPosts,
  getPostById,
  addPost,
  deletePostById,
  addCommentById,
  deleteCommentById,
};
