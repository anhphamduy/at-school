import React from "react";

const SchoolLogo = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <img
          alt="Gungahlin College logo"
          style={{
            width: "30px",
            marginTop: "3vh",
            marginBottom: "0.1vh"
          }}
          src="/gngc.png"
        />
      </div>
    </div>
  );
};

export default SchoolLogo;
