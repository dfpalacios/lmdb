import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from 'context/user/hooks';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [user] = useUserStore()

  return user.id ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;