import React from "react";
import "./Container.css";
type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div id="wrapper">
      <div className="item-wrap">
        <div className="container">{children}</div>
      </div>
    </div>
  );
};
