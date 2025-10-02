import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';
import PageTitle from '../components/PageTitle';
import { MainContainer } from '../components/MainContainer';

const LayoutAtmin: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('1');

    return (
        <Layout
            style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}
        >
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
            />

            <Layout style={{ flex: 1, overflowY: 'auto' }}>
                <HeaderBar collapsed={collapsed} setCollapsed={setCollapsed} />
                <PageTitle
                    title="Recipes"
                    subtitle="Create, check and update recipes"
                />
                <MainContainer />
            </Layout>
        </Layout>
    );
};

export default LayoutAtmin;
