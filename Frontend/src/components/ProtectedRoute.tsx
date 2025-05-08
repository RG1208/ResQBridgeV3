import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const location = useLocation();
  
  useEffect(() => {
    // In a real app, we would validate the token with the backend
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      
      if (token && role && allowedRoles.includes(role)) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    
    checkAuth();
  }, [allowedRoles]);
  
  if (isAuth === null) {
    // Still checking authentication
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!isAuth) {
    // Not authenticated or not authorized, redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;