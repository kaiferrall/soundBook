const likeStatus = (likes, userId) => {
  const filter = likes.filter(like => like === userId);

  if (filter.length > 0) {
    return true;
  } else {
    return false;
  }
};

export default likeStatus;
