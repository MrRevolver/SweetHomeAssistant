import React, { FC } from "react";
import { Spinner } from "grommet";

export const Loader = (props: {size?: string}) => {
  const sizen = props.size ? props.size : "large";
  return (
    <div className="loader-wrapper">
      <Spinner size={`${sizen}`} />
    </div>)
};
