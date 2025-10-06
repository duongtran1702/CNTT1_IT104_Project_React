import React, { useState, useRef, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';

export const BasicInfo: React.FC = () => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [fields, setFields] = useState([
        {
            label: 'Name',
            value: 'Turmeric Roasted Cauliflower Salad (lowfodmap)',
        },
        {
            label: 'Description',
            value: 'Our roasted cauliflower salad with turmeric is low in calories and packed with punchy flavor. Turmeric adds lovely color and flavor to this easy vegan-friendly recipe',
        },
        { label: 'Total time', value: '00:40' },
        { label: 'Preparation time', value: '00:40' },
        { label: 'Final weight', value: '978.8 grams' },
        { label: 'Portions', value: '4' },
    ]);

    const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

    const handleEdit = (index: number) => setEditingIndex(index);

    const handleChange = (index: number, value: string) => {
        const newFields = [...fields];
        newFields[index].value = value;
        setFields(newFields);
    };

    const handleBlur = () => setEditingIndex(null);

    useEffect(() => {
        // Khi editingIndex thay đổi, focus textarea/input và đặt caret cuối
        if (
            editingIndex !== null &&
            fields[editingIndex].label === 'Description' &&
            textareaRefs.current[editingIndex]
        ) {
            const el = textareaRefs.current[editingIndex];
            el.focus();
            el.selectionStart = el.selectionEnd = el.value.length;
        }
    }, [editingIndex, fields]);

    return (
        <div className="bg-white p-5 rounded-md flex flex-col shadow-sm">
            {/* Header */}
            <div className="mb-5">
                <div className="text-[22px] font-medium text-[#1c1c1c] mb-2">
                    Basic information
                </div>
                <div className="mb-5 text-gray-500">
                    Check and edit recipe's basic information
                </div>
            </div>

            {/* Fields */}
            {fields.map((field, index) => (
                <div
                    key={field.label}
                    className="flex border-[1.5px] border-[#c0c0c0] rounded mb-2 w-fit overflow-hidden"
                >
                    {/* Label */}
                    <div className="bg-[#f6f6f6] w-[200px] flex items-center px-2 text-[18px] text-[#1c1c1c]">
                        {field.label}
                    </div>

                    {/* Editable Field */}
                    {editingIndex === index ? (
                        field.label === 'Description' ? (
                            <textarea
                                ref={(el) => {
                                    textareaRefs.current[index] = el;
                                }}
                                value={field.value}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onBlur={handleBlur}
                                className="h-[48px] w-[720px] text-[17px] text-[#625f5f] border-l-[1.5px] border-r-[1.5px] border-[#c0c0c0] px-2 outline-none bg-white resize-none box-border overflow-y-auto custom-scrollbar"
                            />
                        ) : (
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onBlur={handleBlur}
                                autoFocus
                                className="min-h-[40px] w-[720px] text-[17px] text-[#625f5f] border-l-[1.5px] border-r-[1.5px] border-[#c0c0c0] px-2 outline-none bg-white box-border"
                            />
                        )
                    ) : (
                        <div className="min-h-[40px] w-[720px] text-[17px] text-[#625f5f] flex items-center border-l-[1.5px] border-r-[1.5px] border-[#c0c0c0] px-2 bg-white">
                            {field.value}
                        </div>
                    )}

                    {/* Edit Icon */}
                    <div
                        className="w-[40px] bg-[#fbf8f8] flex justify-center items-center  hover:text-green-600 cursor-pointer text-teal-500 transition-colors"
                        onClick={() => handleEdit(index)}
                    >
                        <FaPen size={17} />
                    </div>
                </div>
            ))}
        </div>
    );
};
