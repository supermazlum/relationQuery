import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const User = model("User", UserSchema);
export const Post = model("Post", PostSchema);

const createData = async () => {
  try {
    const userData = [
      { name: "User1", age: 25, email: "User1@example.com" },
      { name: "User2", age: 30, email: "User2@example.com" },
      { name: "User3", age: 35, email: "User3@example.com" },
    ];
    const myUsers = await User.create(userData);
    console.log(myUsers);

    const postData = [
      {
        title: "Post1",
        content: "Contain Post 1",
        author: myUsers[0]._id,
      },
      {
        title: "Post2",
        content: "Contain Post 2",
        author: myUsers[0]._id,
      },
      {
        title: "Post3",
        content: "Contain Post 3",
        author: myUsers[0]._id,
      },
    ];

    const myPosts = await Post.create(postData);
    console.log(myPosts);

    const searchWithUserName = "User1";
    const searchUserPosts = await User.findOne({ name: searchWithUserName }).populate("posts");
    console.log(searchUserPosts.posts);

    const searchPostTitle = "Post1";
    const postWithAuthorName = await Post.findOne({ title: searchPostTitle }).populate("author");
    console.log(postWithAuthorName.author);
  } catch (error) {
    console.error(error);
  }
};

createData();