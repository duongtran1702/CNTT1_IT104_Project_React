import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { resizeImage } from './avata.api';

const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

interface CreateImageProps {
    file: File;
}

export const createImage = createAsyncThunk<string, CreateImageProps>(
    'image/createImage',
    async (data) => {
        try {
            const resizedFile = await resizeImage(data.file, 800, 800);

            const formData = new FormData();
            formData.append('file', resizedFile);
            formData.append('upload_preset', UPLOAD_PRESET);

            const cloudRes = await axios.post(UPLOAD_URL, formData);
            return cloudRes.data.secure_url; // trả về link ảnh
        } catch (err) {
            console.error('Upload failed:', err);
            throw err; // ném lỗi để có thể catch ở component
        }
    }
);
