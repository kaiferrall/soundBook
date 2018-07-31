const profileCompletion = profile => {
  let completed = 0;
  if (profile.tags.length) {
    completed = completed + 1;
  }
  if (profile.bio) {
    completed = completed + 1;
  }
  if (profile.name) {
    completed = completed + 1;
  }
  if (profile.socials) {
    if (
      profile.socials.twitter ||
      profile.socials.instagram ||
      profile.socials.facebook
    ) {
      completed = completed + 1;
    }
  }
  const percentage = (completed * 100) / 4;
  return percentage;
};

export default profileCompletion;
