import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PublishBox: React.FC = () => {
    const nvg=useNavigate()
    return (
        <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm">
            <div className="box-intro">
                <div className="box-intro-top text-[24px] text-gray-600 font-medium">
                    Publish recipe
                </div>
                <div className="box-intro-bot text-[16px] text-gray-400">
                    Publish your recipe on your website or share it with the
                    Nutrium community
                </div>
            </div>

            <Button
                style={{
                    backgroundColor: 'rgba(26, 179, 148, 1)',
                    color: 'white',
                    padding: '8px 16px',
                    fontSize: '18px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                }}
                onClick={()=>nvg('/recipes')}
            >
                Publish
            </Button>
        </div>
    );
};
