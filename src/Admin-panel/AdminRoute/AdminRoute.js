import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("admintoken")
    return token ? children : <Navigate to="/admin-login" />;
};

export default AdminRoute;
