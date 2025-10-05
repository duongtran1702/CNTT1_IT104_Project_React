import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Register from '../pages/Register';
import Login from '../pages/Login';
import LayoutAtmin from '../Layout/LayoutAtmin';
import { NotFoundPage } from '../pages/NotFoundPage';
import { FoodMain } from '../components/MainFood';
import { MainHome } from '../components/MainHome';
// import { MainRecipe } from '../components/MainRecipe';
import { AddImageRecipe } from '../components/AddImageRecipe';

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
        element: (
            <LayoutAtmin>
                <MainHome />
            </LayoutAtmin>
        ),
    },
    {
        path: '/foods',
        element: (
            <LayoutAtmin>
                <FoodMain />
            </LayoutAtmin>
        ),
    },
    {
        path: '/recipes',
        element: (
            <LayoutAtmin>
                {/* <MainRecipe /> */}
                <AddImageRecipe />
            </LayoutAtmin>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
