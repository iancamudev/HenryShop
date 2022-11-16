import React from 'react'
import { Navigate, Route } from "react-router-dom";
import { useAppSelector } from '../../hooks';

interface IProtectedProps{
  children: JSX.Element;
  path: string;
}

const Protected = ({ children, path }: IProtectedProps) => {

  const { username } = useAppSelector((state) => state.user);

  // if (!username) {
  //   return <Navigate to="/" replace />;
  // }
  // return children;

  return (
    <Route
      path={path}
      element={
        username
          ? children
          : <Navigate to="/" replace={true} />
      } 
    />
  )
};

export default Protected;