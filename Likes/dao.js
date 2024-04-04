import userModel from "../Users/model.js";
import albumModel from "../Napster/albums/model.js";

export const userLikesAlbum = async (userId, album) => {
  const user = await userModel.findById(userId);
  let actualAlbum = await albumModel.findOne({ albumId: album.albumId });
  if (!actualAlbum) {
    actualAlbum = await albumModel.create(album);
  }
  user.likesAlbums.push(actualAlbum._id);
  actualAlbum.likedBy.push(user._id);
  await user.save();
  await actualAlbum.save();
};

export const userUnlikesAlbum = async (userId, albumId) => {
  const user = await userModel.findById(userId);
  const album = await albumModel.findOne({ albumId });
  user.likesAlbums = user.likesAlbums.filter((id) => id !== album._id);
  album.likedBy = album.likedBy.filter((id) => id !== user._id);
  await user.save();
  await album.save();
};

export const findAllLikedAlbums = async (userId) => {
  const user = await userModel.findById(userId).populate("likesAlbums");
  return user.likesAlbums;
};
