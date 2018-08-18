const followingStatus = (profile, profile2) => {
  const user = profile2.user;

  const filter = profile.following.filter(following => following === user);

  if (filter.length > 0) {
    return true;
    console.log("test true");
  } else {
    return false;
    console.log("test false");
  }
};

export default followingStatus;
