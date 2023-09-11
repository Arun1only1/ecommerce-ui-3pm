import React from "react";

const Home = () => {
  const userName = localStorage.getItem("firstName");
  return (
    <div>
      <h3>Welcome {userName}</h3>
    </div>
  );
};

export default Home;
