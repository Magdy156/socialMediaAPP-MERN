import Post from "../models/Post";
import User from "../models/User";

export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;
    const { file } = req;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      location: user.location,
      picturePath: file.originalname,
      userPicturePath: user.picturePath,
      likes: {},
      commets: [],
    });
    await newPost.save();
    const posts = await Post.find(); //returning all posts after update
    res.status(201).json(posts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find(); //returning all posts after update
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    const userPosts = await Post.find({ userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // user who liked the post
    const post = await Post.findById(id);

    const isLiked = post.likes.get(userId);
    /*if (isLiked) =true then the user has already liked the post 
        so in if condition i will remove this like on liking again */

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
