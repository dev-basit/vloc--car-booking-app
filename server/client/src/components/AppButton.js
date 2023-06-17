import React from "react";

import colors from "../config/colors";

function AppButton({
  color = colors.white,
  backgroundColor = colors.primary,
  type = "button",
  text,
  onClick,
  className = "mblButton",
  style,
  children,
}) {
  return (
    <button type={type} onClick={onClick} style={{ color, backgroundColor }} className={`${className}`}>
      {children && <>{children}</>}
      <p style={{ ...style }}>{text}</p>
    </button>
  );
}

export default AppButton;
