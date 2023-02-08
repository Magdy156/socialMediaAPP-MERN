import User from "../models/User";

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "user does not exist" });
    }
    res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "user does not exist" });
    }
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      return { _id, firstName, lastName, occupation, location, picturePath };
    });

    res.status(200).json(formattedFriends);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: "user does not exist" });
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(400).json({ msg: "friend does not exist" });
    }
    if (user.friends.includes(friendId)) {
      user.friends.filter((id) => id !== friendId);
      friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map((friend) => {
      const { _id, firstName, lastName, occupation, location, picturePath } =
        friend;
      return { _id, firstName, lastName, occupation, location, picturePath };
    });
    res.status(200).json(formattedFriends);
  } catch (error) {
    return res.status(404).json({ msg: error.message });
  }
};
