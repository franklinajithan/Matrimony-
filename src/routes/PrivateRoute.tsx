import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactElement; // The protected component
}

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token'); // Replace with your auth logic
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
