import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    // server: {
    //     host: '192.168.4.166', // 👈 IP nội bộ của máy Dương
    //     port: 5173, // hoặc đổi nếu cổng bị trùng
    //     strictPort: true,
    //     cors: true,
    //     origin: 'http://192.168.4.166:5173', // 👈 để client truy cập được module
    // },
});
