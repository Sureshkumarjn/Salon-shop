import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const CheckAuth = (
  isUserLoggedIn: boolean,
  component: any
): ReactElement => {
  if (isUserLoggedIn) {
    return component;
  }
  return <Navigate to="/login" />;
};
