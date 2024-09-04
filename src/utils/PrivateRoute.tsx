import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout';

interface PrivateRouteProps {
    element: React.ComponentType;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ element: Component }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    return isAuthenticated ? (
        <Layout>
            <Component />
        </Layout>
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
