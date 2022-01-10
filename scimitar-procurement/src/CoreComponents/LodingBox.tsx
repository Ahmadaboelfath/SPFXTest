import * as React from "react";

interface loadingProps {
  childLoader?: boolean;
}

export const LoadingBoxComponent: React.FC<loadingProps> = (props) => {
  return (
    <div
      className={
        props.childLoader == true
          ? "loadingBox loadingBoxcontainer"
          : "loadingBox"
      }
    >
      <div></div>
      <div></div>
    </div>
  );
};
