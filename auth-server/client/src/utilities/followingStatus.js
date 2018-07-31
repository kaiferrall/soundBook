const followingStatus = (profile, profile2) => {
  const user = profile2.user;

  const filter = profile.following.filter(following => following === user);

  if (filter.length > 0) {
    return true;
  } else {
    return false;
  }
};

export default followingStatus;
