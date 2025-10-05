import React, { useEffect, useState } from 'react';
import { Layout, Button, Avatar, Space, Upload } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import atmin1 from '../assets/atmin-1.png';
import PageTitle from './PageTitle';
import { toast, ToastContainer } from 'react-toastify';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { updateAvatar } from '../apis/avata.api';
import { getUsers } from '../apis/user.api';
import type { User } from '../interfaces/user.interface';
import { useLocation } from 'react-router-dom';

const { Header } = Layout;

interface HeaderBarProps {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ collapsed, setCollapsed }) => {
    const dataLocal = localStorage.getItem('currentUser');
    const userLocal = dataLocal ? JSON.parse(dataLocal) : null;

    const location = useLocation();
    const firstSegment = location.pathname.split('/')[1];

    // Ưu tiên lấy avatar từ localStorage khi mount
    const [avatarUrl, setAvatarUrl] = useState<string>(
        userLocal?.avata || atmin1
    );

    const dispatch = atminDispatch();
    const users = atminSelector((s) => s.user.users);

    useEffect(() => {
        if (users.length < 1) dispatch(getUsers());
    }, [dispatch, users.length]);

    const user: User | undefined = users.find((u) => u.id === userLocal?.id);

    useEffect(() => {
        if (user?.avata) setAvatarUrl(user.avata);
        else if (userLocal?.avata) setAvatarUrl(userLocal.avata);
        else setAvatarUrl(atmin1);
    }, [user, userLocal]);

    const handleUpload = async (file: File) => {
        if (!user) {
            toast.error('User not found');
            return false;
        }

        // Show loading toast
        const loadingToastId = toast.loading('Uploading avatar...', {
            autoClose: false,
        });

        try {
            const result = await dispatch(
                updateAvatar({ file, userId: user.id })
            ).unwrap();

            setAvatarUrl(result.avata || atmin1);

            const updatedUser = { ...userLocal, avata: result.avata || atmin1 };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // Close the loading toast and show success message
            toast.update(loadingToastId, {
                render: 'Avatar updated successfully!',
                type: 'success',
                autoClose: 1200,
                isLoading: false,
            });
        } catch (error: unknown) {
            const messageText =
                error instanceof Error ? error.message : 'Update failed';
            toast.update(loadingToastId, {
                render: messageText,
                type: 'error',
                autoClose: 1200,
                isLoading: false,
            });
        }

        return false;
    };

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <ToastContainer
                autoClose={1200}
                closeOnClick
                pauseOnHover
                draggable
            />
            <Header
                style={{
                    background: '#fff',
                    borderBottom: '1px solid #e5e7eb',
                    padding: '0 32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                }}
            >
                {/* Left */}
                <Button
                    type="text"
                    icon={
                        <MenuOutlined style={{ fontSize: 16, color: '#fff' }} />
                    }
                    style={{
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(26, 179, 148, 1)',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={() => setCollapsed(!collapsed)}
                />

                {/* Right */}
                <Space size="small">
                    <Upload
                        showUploadList={false}
                        beforeUpload={handleUpload}
                        accept="image/*"
                    >
                        <Avatar
                            src={avatarUrl}
                            style={{
                                width: 40,
                                height: 40,
                                border: '2px solid #e5e7eb',
                                cursor: 'pointer',
                            }}
                        />
                    </Upload>
                    {user ? (
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>
                            {user.account.username}
                        </span>
                    ) : (
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>
                            Guest
                        </span>
                    )}
                </Space>
            </Header>
            {firstSegment === 'home' ? (
                <PageTitle
                    title="Home"
                    subtitle="Explore nutrition tips, track your meals, and discover healthy recipes"
                />
            ) : firstSegment === 'foods' ? (
                <PageTitle
                    title="Food databases"
                    subtitle="Create, check and update foods that you can use on meal plan"
                />
            ) : (
                <PageTitle
                    title="Recipes"
                    subtitle="Create, check and update recipes"
                />
            )}
        </div>
    );
};

export default HeaderBar;
