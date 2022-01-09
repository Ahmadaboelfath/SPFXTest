import * as React from "react";

interface loadingProps {
  childLoader?: boolean;
}

export const LoadingBoxComponent: React.FC<loadingProps> = (props) => {
  return (
    <div className="ui segment">
      <div className="ui active loader"></div>
      <p></p>
    </div>
  );
};
