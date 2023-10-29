export const isLoggedInUser = () => {
  const accesstoken = localStorage.getItem("accesstoken");

  let isLoggedInUser = false;

  if (accesstoken) {
    isLoggedInUser = true;
  }

  return isLoggedInUser;
};
