import React from "react";

function Screen({ children, className }) {
  return <div className={`screen ${className}`}>{children}</div>;
}

export default Screen;
