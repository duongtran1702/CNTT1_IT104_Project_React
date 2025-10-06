import React, { useState } from 'react';
import { Button, Layout, Menu, Modal } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import brandLogo from '../assets/brand.png';
import brandLogo1 from '../assets/brand-1.png';
import { HiUserRemove } from 'react-icons/hi';
import { IoFastFoodSharp } from 'react-icons/io5';
import { GiHotMeal } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
    selectedKey: string;
    setSelectedKey: (key: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    collapsed,
    selectedKey,
    setSelectedKey,
}) => {
    const nvg = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
        nvg('/login');
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={220}
                style={{
                    background:
                        'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                }}
                className="shadow-lg relative"
            >
                {/* Logo */}
                <div className="flex justify-center items-center h-20 border-b border-slate-600 overflow-hidden">
                    <img
                        src={brandLogo}
                        alt="brand"
                        className={`transition-all duration-500 ease-in-out ${
                            collapsed
                                ? 'opacity-0 scale-90 w-0'
                                : 'opacity-100 scale-100 w-32 sm:w-40'
                        }`}
                    />
                    <img
                        src={brandLogo1}
                        alt="brand"
                        className={`absolute transition-all duration-500 ease-in-out ${
                            collapsed
                                ? 'opacity-100 scale-100 w-10'
                                : 'opacity-0 scale-90 w-0'
                        }`}
                    />
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={({ key }) => {
                        setSelectedKey(key);
                        nvg(`/${key}`);
                    }}
                    items={[
                        {
                            key: 'home',
                            icon: <HomeOutlined style={{ fontSize: 20 }} />,
                            label: 'Homepage',
                        },
                        {
                            key: 'foods',
                            icon: <IoFastFoodSharp style={{ fontSize: 20 }} />,
                            label: 'Foods',
                        },
                        {
                            key: 'recipes',
                            icon: <GiHotMeal style={{ fontSize: 20 }} />,
                            label: 'Recipes',
                        },
                    ]}
                    style={{
                        background: 'transparent',
                        borderRight: 0,
                        paddingTop: '16px',
                    }}
                    className="custom-menu"
                />

                <div className="absolute bottom-0 w-full ">
                    <Button
                        block
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            background: '#0d9488',
                            border: 'none',
                            color: '#fff',
                            height: 40,
                            fontSize: 16,
                            borderRadius: 0,
                        }}
                        icon={
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    background: '#f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <HiUserRemove
                                    style={{ color: '#0d9488', fontSize: 18 }}
                                />
                            </div>
                        }
                    >
                        {!collapsed && 'Sign out'}
                    </Button>
                </div>
            </Sider>
            <Modal
                centered
                title={null}
                width={400}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Logout"
                cancelText="Cancel"
                okButtonProps={{ danger: true }}
                className="rounded-xl overflow-hidden"
                styles={{
                    content: {
                        borderRadius: '12px',
                        padding: '24px',
                    },
                    footer: {
                        borderTop: 'none',
                        textAlign: 'center',
                    },
                }}
            >
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Confirm Logout
                    </h2>
                    <p className="text-gray-500">
                        Are you sure you want to logout?
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default Sidebar;
