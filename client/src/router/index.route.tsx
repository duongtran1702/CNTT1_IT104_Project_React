import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Register from '../pages/Register';
import Login from '../pages/Login';
import LayoutAtmin from '../Layout/LayoutAtmin';
import { NotFoundPage } from '../pages/NotFoundPage';

// import { MainRecipe } from '../components/MainRecipe';
import { MainAddRecipe } from '../pages/MainAddRecipe';
import { FoodMain } from '../pages/MainFood';
import { MainHome } from '../pages/MainHome';
import { MainRecipe } from '../pages/MainRecipe';

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
        element: <Navigate to="/home" replace />,
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
        path: '/add_recipe',
        element: (
            <LayoutAtmin>
                <MainAddRecipe />
            </LayoutAtmin>
        ),
    },
    {
        path: '/detail_recipe',
        element: (
            <LayoutAtmin>
                <MainAddRecipe />
            </LayoutAtmin>
        ),
    },
    {
        path: '/recipes',
        element: (
            <LayoutAtmin>
                <MainRecipe />
            </LayoutAtmin>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
