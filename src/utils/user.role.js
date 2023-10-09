// return true if logged in user's role is seller
// else returns false

export const isSeller = () => {
  const userRole = localStorage.getItem("userRole");

  return userRole === "seller";
};
