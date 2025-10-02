import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Register from '../pages/Register';
import Login from '../pages/Login';
import LayoutAtmin from '../Layout/LayoutAtmin';
import { NotFoundPage } from '../pages/NotFoundPage';

export const routers = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },

    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        index: true,
        element: <Navigate to="/login" replace />,
    },
    {
        path: '/home',
        element: <LayoutAtmin />,
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
