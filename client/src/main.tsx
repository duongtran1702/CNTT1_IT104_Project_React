import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.ts';
import { RouterProvider } from 'react-router-dom';
import { routers } from './router/index.route.tsx';

// 🧩 Ẩn lỗi "Extension context invalidated" khi reload (do Chrome extension)
window.addEventListener('unhandledrejection', (event) => {
    if (event.reason?.message?.includes('Extension context invalidated')) {
        event.preventDefault(); // chặn log lỗi ra console
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={routers} />
        </Provider>
    </StrictMode>
);
