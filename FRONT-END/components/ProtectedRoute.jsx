import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if the user token or authentication flag exists in localStorage
  const isAuthenticated = localStorage.getItem('userToken');

  // If not logged in, redirect them to the login page immediately
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the protected page content
  return children;
}

export default ProtectedRoute;