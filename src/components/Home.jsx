import React from "react";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CertManager</title>
      </Helmet>
      <h1 className="homepage">Welcome to CertManager!</h1>
      <p1>I'm slowly learning more React and hope to finish this soon!</p1>
    </div>
  );
};

export default Home;
