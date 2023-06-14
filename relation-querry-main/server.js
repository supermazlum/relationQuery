import express from "express";
import mongoose from "mongoose";
import { User, Post } from "./mongoose.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/mydatabase");

app.get("/myUsers/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const userWithPosts = await User.findOne({ name }).populate("posts");
    res.json(userWithPosts.posts);
  } catch (error) {
    console.error(error);
  }
});

app.get("/posts/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const postWithAuthor = await Post.findOne({ title }).populate("author");
    res.json(postWithAuthor.author);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(port);
});
