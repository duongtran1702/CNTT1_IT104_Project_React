import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/callAPI';
import axios from 'axios';

// Cấu hình Cloudinary
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Interface dữ liệu nhận vào
interface UpdateAvatarProps {
    file: File;
    userId: string;
}

// Resize ảnh trước khi upload
export const resizeImage = (file: File, maxWidth: number, maxHeight: number) => {
    return new Promise<File>((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result && typeof reader.result === 'string') {
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    // Tính toán tỷ lệ để co ảnh
                    let width = img.width;
                    let height = img.height;
                    const ratio = Math.min(
                        maxWidth / width,
                        maxHeight / height
                    );

                    if (ratio < 1) {
                        width = width * ratio;
                        height = height * ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx?.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            const resizedFile = new File([blob], file.name, {
                                type: file.type,
                            });
                            resolve(resizedFile);
                        } else {
                            reject(new Error('Failed to resize the image.'));
                        }
                    }, file.type);
                };
                img.onerror = (error) => reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

// Redux Thunk: Cập nhật Avatar
export const updateAvatar = createAsyncThunk(
    'user/updateAvatar',
    async (data: UpdateAvatarProps) => {
        // Resize ảnh trước khi upload
        const maxWidth = 800;
        const maxHeight = 800;

        try {
            const resizedFile = await resizeImage(
                data.file,
                maxWidth,
                maxHeight
            );

            // Tạo FormData để upload lên Cloudinary
            const formData = new FormData();
            formData.append('file', resizedFile);
            formData.append('upload_preset', UPLOAD_PRESET);

            // Upload ảnh lên Cloudinary
            const cloudRes = await axios.post(UPLOAD_URL, formData);
            const avatarUrl = cloudRes.data.secure_url;

            // Cập nhật URL ảnh vào server
            const res = await api.patch(`users/${data.userId}`, {
                avata: avatarUrl,
            });

            return res.data; // Trả về dữ liệu trả về từ API
        } catch (error) {
            console.log(error);
        }
    }
);
