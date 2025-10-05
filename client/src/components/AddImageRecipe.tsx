import { Select } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { AiOutlineClose, AiOutlineUpload, AiOutlinePlus } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

export const AddImageRecipe = () => {
    const [image, setImage] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const [categories, setCategories] = useState([
        'Fruits',
        'Vegetables',
        'Drinks',
    ]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const [isAdding, setIsAdding] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Khi chuyển sang input -> tự focus
    useEffect(() => {
        if (isAdding && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAdding]);

    // Upload ảnh
    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImage(previewUrl);
        }
    };

    const handleClearImage = () => setImage(null);

    // Thêm category khi nhấn Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newCategory.trim() !== '') {
            const trimmed = newCategory.trim();
            if (!categories.includes(trimmed)) {
                setCategories((prev) => [...prev, trimmed]);
            }
            setSelectedCategory(trimmed);
            setNewCategory('');
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-white rounded-[8px] shadow-lg p-5 w-65 flex flex-col gap-4 transition hover:shadow-xl">
            <div className="flex justify-between items-center">
                <button className="flex items-center gap-2 bg-blue-10 text-blue-500 px-3 py-1 rounded-full text-sm font-medium shadow">
                    <FaPen className="w-4 h-4" />
                    My Recipes
                </button>
                <div
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm shadow cursor-pointer transition 
        ${liked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-500'}`}
                >
                    <FiHeart
                        className={`w-4 h-4 transition 
          ${liked ? 'fill-red-500 text-red-500' : ''}`}
                    />
                    <span>{liked ? 1 : 0}</span>
                </div>
            </div>

            {/* Upload / Preview */}
            {!image ? (
                <div className="flex justify-center items-center h-40">
                    <label className="flex items-center gap-2 px-2 py-1 text-sm border-[2px] border-dashed border-orange-400 text-orange-500 rounded-[5px] cursor-pointer hover:bg-orange-50 transition">
                        <AiOutlineUpload className="text-orange-500" />
                        Upload image
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleSelectImage}
                        />
                    </label>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={image}
                        alt="preview"
                        className="rounded-xl w-full h-40 object-cover shadow"
                    />
                    <button
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-red-100 transition"
                    >
                        <AiOutlineClose className="w-4 h-4 text-red-500" />
                    </button>
                </div>
            )}

            {/* Category / Input */}
            <div className="flex items-center gap-2 bg-orange-10 border border-gray-200 rounded-[10px] px-3 text-sm shadow-sm h-[30px]">
                <BiCategory
                    className="text-orange-500 w-5 h-5 flex-shrink-0"
                    size={16}
                />

                {isAdding ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="New category..."
                        className="text-sm text-orange-500 outline-none flex-1 h-[30px] w-29"
                    />
                ) : (
                    <Select
                        value={selectedCategory || 'Select category'}
                        suffixIcon={null}
                        onChange={(value) => setSelectedCategory(String(value))}
                        options={categories.map((c) => ({
                            label: c,
                            value: c,
                        }))}
                        className="custom-select"
                        // style cho chính input trigger
                        style={{
                            width: '100%',
                            background: 'transparent',
                            color: selectedCategory ? '#ff7a00' : '#efc081',
                            border: 'none',
                        }}
                        styles={{
                            popup: {
                                root: {
                                    borderRadius: 10,
                                    padding: 6,
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                },
                            },
                        }}
                        placement="bottomLeft"
                        popupMatchSelectWidth={false}
                    />
                )}

                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="text-orange-500 hover:text-orange-600 cursor-pointer transition"
                >
                    <AiOutlinePlus className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
