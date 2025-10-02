import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import brandLogo from '../assets/brand.png';
import brandLogo1 from '../assets/brand-1.png';
import { HiUserRemove } from 'react-icons/hi';
import { IoFastFoodSharp } from 'react-icons/io5';
import { GiHotMeal } from 'react-icons/gi';

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
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={220}
            style={{
                background: 'linear-gradient(180deg, #334155 0%, #1e293b 100%)',
                position: 'sticky', // ✅ sticky
                top: 0, // dính từ trên
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
                onClick={({ key }) => setSelectedKey(key)}
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined style={{ fontSize: 20 }} />,
                        label: 'Homepage',
                    },
                    {
                        key: '2',
                        icon: <IoFastFoodSharp style={{ fontSize: 20 }} />,
                        label: 'Foods',
                    },
                    {
                        key: '3',
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
    );
};

export default Sidebar;
