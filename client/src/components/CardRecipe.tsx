import type { Recipe } from '../interfaces/recipe';
import image from '../assets/Icon-2.png';
import image2 from '../assets/diversity_3.svg.png';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
type CardProps = {
    data: Recipe;
};

export const CardRecipe = ({ data }: CardProps) => {
    const [liked, setLiked] = useState(false);
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
            }}
            onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)')
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)')
            }
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
                        src={data.image}
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
                    {data.title}
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '5px 15px 5px 30px',
                        justifyContent: 'space-between',
                    }}
                >
                    <div
                        style={{
                            color: 'rgba(103, 106, 108, 1)',
                            fontSize: '15px',
                            fontWeight: 600,
                        }}
                    >
                        {data.author}
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
                        onClick={() => setLiked(!liked)}
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
                            {data.likes}
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
                            {data.energy} kcal
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
                            {data.fat} g
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
                            {data.carbs} g
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
                            {data.protein} g
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
