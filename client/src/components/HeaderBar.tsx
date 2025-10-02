import React from 'react';
import { Layout, Button, Avatar, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import atmin1 from '../assets/atmin-1.png';

const { Header } = Layout;

interface HeaderBarProps {
    collapsed: boolean;
    setCollapsed: (val: boolean) => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ collapsed, setCollapsed }) => {
    return (
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
                icon={<MenuOutlined style={{ fontSize: 16, color: '#fff' }} />}
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
            <Space size="middle">
                <span style={{ fontSize: '14px', color: '#4b5563' }}>
                    Atmin
                </span>
                <Avatar
                    src={atmin1}
                    style={{
                        width: 40,
                        height: 40,
                        border: '2px solid #e5e7eb',
                    }}
                />
            </Space>
        </Header>
    );
};

export default HeaderBar;
