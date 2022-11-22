import React from "react";
const gifLoading = require("../assets/gifLoading.gif");

export const Loading = () => {
  return (
    <div>
      <img src={gifLoading} alt="Gif_cargando"/>
    </div>
  );
};
