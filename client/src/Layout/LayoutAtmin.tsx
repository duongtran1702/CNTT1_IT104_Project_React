import React, { useEffect, useMemo, useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../components/Sidebar';
import HeaderBar from '../components/HeaderBar';

interface LayoutAtminProps {
    children: React.ReactNode;
}

function LayoutAtmin({ children }: LayoutAtminProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKey, setSelectedKey] = useState('home');
    const page = useMemo(() => ['home', 'recipes', 'foods'], []);

    const locationPath = window.location.pathname.split('/')[1];
    useEffect(() => {
        if (page.includes(locationPath)) setSelectedKey(locationPath);
        else if(locationPath==='detail_recipe'||locationPath==='add_recipe') setSelectedKey('recipes')
    }, [page, locationPath]);

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
                {children}
            </Layout>
        </Layout>
    );
}

export default LayoutAtmin;
