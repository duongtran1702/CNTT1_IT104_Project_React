import { useState, type ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

export const PrivateRouter = ({ children }: { children: ReactNode }) => {
    const [isLogin] = useState<boolean>(() => {
        const dataLocal = localStorage.getItem('login');
        if (!dataLocal) return false;
        else {
            const data = JSON.parse(dataLocal);
            return data.isLogin;
        }
    });

    return isLogin ? <>{children}</> : <Navigate to="/login"></Navigate>;
};
