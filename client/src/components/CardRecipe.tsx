import image from '../assets/Icon-2.png';
import image2 from '../assets/diversity_3.svg.png';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { Recipe } from '../interfaces/recipe.interface';
import atmin1 from '../assets/atmin-1.png';
import { Avatar } from 'antd';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { getUsers } from '../apis/user.api';

type CardProps = {
    data: Recipe;
    onClick?: () => void;
};

export const CardRecipe = ({ data, onClick }: CardProps) => {
    const [liked, setLiked] = useState(false);
    const users = atminSelector((s) => s.user.users);
    const dispatch = atminDispatch();
    
    useEffect(() => {
        if (users.length === 0) dispatch(getUsers());
    }, [dispatch, users]);

    if (!data) return;
    const author = users.find((u) => u.account.username === data.author);
    return (
        <div
            style={{
                padding: '12px',
                width: '100%',
                border: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                height: '220px',
                boxSizing: 'border-box',
                borderRadius: '12px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                maxWidth:590
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)')
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')
            }
            onClick={onClick}
        >
            {/* Left Card */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '15px 10px',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: '186px',
                        height: '186px',
                        borderRadius: '5px',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={data.image || atmin1}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '5px',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            top: '8%',
                            left: '13%',
                            zIndex: 10,
                            fontWeight: 'bold',
                            color: 'rgba(234, 159, 119, 1)',
                            display: 'flex',
                            fontSize: '10.5px',
                            alignItems: 'center',
                            padding: '6px 8px',
                            borderRadius: '6px',
                            backgroundColor: 'rgb(255, 254, 254)',
                            width: '138px',
                        }}
                    >
                        <img
                            src={image2}
                            alt=""
                            style={{
                                width: '18px',
                                height: '16px',
                                marginRight: '4px',
                            }}
                        />
                        Community Recipes
                    </div>
                </div>
            </div>

            {/* Right Card */}
            <div
                style={{
                    width: '340px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '15px 10px 10px 10px',
                }}
            >
                <div
                    style={{
                        color: 'rgb(34, 34, 34)',
                        fontWeight: 600,
                        fontSize: '18px',
                    }}
                >
                    {data.name}
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 15px 5px 0px',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className="flex items-center gap-3">
                        <Avatar
                            src={author?.avata || atmin1}
                            style={{
                                width: 40,
                                height: 40,
                                border: '2px solid #e5e7eb',
                                cursor: 'pointer',
                            }}
                        />
                        <div
                            style={{
                                color: 'rgba(103, 106, 108, 1)',
                                fontSize: '15px',
                                fontWeight: 600,
                            }}
                        >
                            {data.author}
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                            padding: '5px 10px',
                            border: '2px solid rgba(238, 238, 238, 1)',
                            width: 'fit-content',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            setLiked(!liked);
                        }}
                    >
                        {liked ? (
                            <HeartFilled
                                style={{ fontSize: '18px', color: 'red' }}
                            />
                        ) : (
                            <HeartOutlined
                                style={{ fontSize: '18px', color: '#aaa' }}
                            />
                        )}
                        <div
                            style={{
                                minWidth: '20px',
                                textAlign: 'center',
                                color: '#000',
                            }}
                        >
                            {liked ? Number(data.like) + 1 : Number(data.like)}
                        </div>
                    </div>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <img
                        src={image}
                        alt=""
                        style={{ width: '22px', height: '22px' }}
                    />
                    <div
                        style={{
                            fontSize: '15px',
                            color: 'rgba(103, 106, 108, 1)',
                        }}
                    >
                        {data.category}
                    </div>
                </div>

                <div
                    style={{
                        borderTop: '1px solid rgb(208, 208, 208)',
                        display: 'flex',
                        padding: '5px',
                        paddingBottom: '0px',
                        justifyContent: 'space-between',
                    }}
                >
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: 'rgba(103, 106, 108, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            By
                        </li>
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            {100} g
                        </li>
                    </ul>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: 'rgba(103, 106, 108, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            Energy
                        </li>
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            {data.macro.calories} kcal
                        </li>
                    </ul>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: 'rgba(103, 106, 108, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            Fat
                        </li>
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            {data.macro.fat} g
                        </li>
                    </ul>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: 'rgba(103, 106, 108, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            Carbohydrate
                        </li>
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            {data.macro.carb} g
                        </li>
                    </ul>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            color: 'rgba(103, 106, 108, 1)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                        }}
                    >
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            Protein
                        </li>
                        <li style={{ textAlign: 'center', fontSize: '13px' }}>
                            {data.macro.protein} g
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
