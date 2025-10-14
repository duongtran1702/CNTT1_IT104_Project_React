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
import { PrivateRouter } from '../components/PrivateRouter';

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
            <PrivateRouter>
                <LayoutAtmin>
                    <MainHome />
                </LayoutAtmin>
            </PrivateRouter>
        ),
    },
    {
        path: '/foods',
        element: (
            <PrivateRouter>
                <LayoutAtmin>
                    <FoodMain />
                </LayoutAtmin>
            </PrivateRouter>
        ),
    },
    {
        path: '/add_recipe',
        element: (
            <PrivateRouter>
                <LayoutAtmin>
                    <MainAddRecipe />
                </LayoutAtmin>
            </PrivateRouter>
        ),
    },
    {
        path: '/detail_recipe/:id',
        element: (
            <PrivateRouter>
                <LayoutAtmin>
                    <MainAddRecipe />
                </LayoutAtmin>
            </PrivateRouter>
        ),
    },
    {
        path: '/recipes',
        element: (
            <PrivateRouter>
                <LayoutAtmin>
                    <MainRecipe />
                </LayoutAtmin>
            </PrivateRouter>
        ),
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
