import React, { useState, useRef, useEffect } from 'react';
import { FaPen } from 'react-icons/fa';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import type { Recipe } from '../interfaces/recipe.interface';
import { toast } from 'react-toastify';
import { setCreateRecipe } from '../redux/reducers/createRecipe.reducer';

export const BasicInfo: React.FC = () => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const inforBasic: Omit<Recipe, 'id' | 'author'> = atminSelector(
        (s) => s.createRecipe
    );
    const [fields, setFields] = useState([
        {
            label: 'Name',
            value: inforBasic.name,
            placeholder: 'Enter name recipe',
        },
        {
            label: 'Description',
            value: inforBasic.description,
            placeholder: 'Enter description about recipe',
        },
        {
            label: 'Total time',
            value: inforBasic.totalTime,
            placeholder: '00:00',
        },
        {
            label: 'Preparation time',
            value: inforBasic.prepTime,
            placeholder: '00:00',
        },
        {
            label: 'Final weight',
            value: String(inforBasic.weight),
            unit: 'g',
            placeholder: '0 g',
        },
        {
            label: 'Portions',
            value: inforBasic.protions,
            placeholder: 'Enter the portions',
        },
    ]);

    const [touchedEmpty, setTouchedEmpty] = useState<boolean[]>(
        new Array(6).fill(false)
    );

    const dispatch = atminDispatch();

    useEffect(() => {
        const updatedRecipe = {
            name: fields[0].value,
            description: fields[1].value,
            totalTime: fields[2].value,
            prepTime: fields[3].value,
            finalWeight: fields[4].value,
            protions: fields[5].value,
        };
        dispatch(setCreateRecipe(updatedRecipe));
    }, [fields, dispatch]);

    const disabledFieldLabelsRef = useRef(new Set(['Final weight']));
    const isDisabledField = (label: string) =>
        disabledFieldLabelsRef.current.has(label);

    const handleEdit = (index: number) => {
        const label = fields[index]?.label;
        if (isDisabledField(label)) return;
        setEditingIndex(index);
    };

    const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        const newFields = [...fields];
        newFields[index].value = value;

        const newTouched = [...touchedEmpty];
        newTouched[index] = false;

        setFields(newFields);
        setTouchedEmpty(newTouched);
    };

    useEffect(() => {
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

    const formatMinutesToTime = (value: string): string => {
        const minutes = parseInt(value, 10);
        if (isNaN(minutes)) return value;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}:${mins.toString().padStart(2, '0')}`;
    };

    const isTimeFormat = (val: string): boolean => {
        const trimmed = val.trim();
        const basicMatch = /^\d{1,2}:\d{1,2}$/.test(trimmed);
        if (!basicMatch) return false;
        const parts = trimmed.split(':');
        const mins = parseInt(parts[1], 10);
        if (isNaN(mins) || mins < 0 || mins > 59) return false;
        return true;
    };

    const handleBlur = (index: number) => {
        const label = fields[index].label;
        const value = fields[index].value.trim();

        if (!value) {
            const newTouched = [...touchedEmpty];
            newTouched[index] = true;
            setTouchedEmpty(newTouched);
        }

        if (label === 'Total time' || label === 'Preparation time') {
            if (isTimeFormat(value)) {
                setEditingIndex(null);
                return;
            }

            if (/^\d+$/.test(value)) {
                const formatted = formatMinutesToTime(value);
                const newFields = [...fields];
                newFields[index].value = formatted;
                setFields(newFields);
                setEditingIndex(null);
                return;
            }

            toast.error('Please enter a valid time (e.g. 90 or 1:30)');
            setEditingIndex(null);
            return;
        }

        setEditingIndex(null);
    };

    useEffect(() => {
        const weightStr = String(inforBasic?.weight ?? '');
        setFields((prev) => {
            const curr = prev[4]?.value ?? '';
            if (curr === weightStr) return prev;
            const copy = [...prev];
            copy[4] = { ...copy[4], value: weightStr };
            return copy;
        });
    }, [inforBasic?.weight]);

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
                                placeholder={field.placeholder}
                                value={field.value}
                                onChange={(e) => {
                                    handleChange(index, e.target.value);

                                    const ta = textareaRefs.current[index];
                                    if (ta) {
                                        // reset chiều cao về 2 dòng
                                        ta.style.height = '50px';
                                        // set chiều cao theo nội dung
                                        ta.style.height =
                                            ta.scrollHeight + 'px';
                                    }
                                }}
                                onBlur={() => handleBlur(index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleBlur(index);
                                        if (index < fields.length - 1) {
                                            if (index === 3)
                                                setEditingIndex(index + 2);
                                            else setEditingIndex(index + 1);
                                        }
                                    }
                                }}
                                className="w-[720px] text-[17px] text-[#625f5f] border-l-[1.5px] border-r-[1.5px] border-[#c0c0c0] px-2 outline-none bg-white resize-none box-border overflow-hidden"
                            />
                        ) : (
                            <input
                                type="text"
                                value={field.value}
                                placeholder={field.placeholder}
                                onChange={(e) =>
                                    handleChange(index, e.target.value)
                                }
                                onBlur={() => handleBlur(index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleBlur(index);
                                        if (index < fields.length - 1) {
                                            if (index === 3)
                                                setEditingIndex(index + 2);
                                            else setEditingIndex(index + 1);
                                        }
                                    }
                                }}
                                autoFocus
                                className="min-h-[40px] w-[720px] text-[17px] text-[#625f5f] border-l-[1.5px] border-r-[1.5px] border-[#c0c0c0] px-2 outline-none bg-white box-border"
                            />
                        )
                    ) : (
                        <div
                            className={`min-h-[40px] w-[720px] text-[17px] flex items-center border-l-[1.5px] border-r-[1.5px] border-[#c0c0c0] px-2 transition-colors duration-300 
                        ${
                            touchedEmpty[index]
                                ? 'bg-red-50'
                                : isDisabledField(field.label)
                                ? 'bg-gray-100'
                                : 'bg-white'
                        }
                        ${
                            field.value.trim() === ''
                                ? 'text-[#b6bbc4]'
                                : 'text-[#625f5f]'
                        }`}
                        >
                            {field.value || field.placeholder}{' '}
                            {field.value && field.unit && ` ${field.unit}`}
                        </div>
                    )}

                    <div
                        onClick={() => {
                            if (!isDisabledField(field.label))
                                handleEdit(index);
                        }}
                        className={`w-[40px] bg-[#fbf8f8] flex justify-center items-center transition-colors
                        ${
                            isDisabledField(field.label)
                                ? 'cursor-not-allowed text-gray-300'
                                : 'cursor-pointer text-teal-500 hover:text-green-600'
                        }`}
                    >
                        <FaPen size={17} />
                    </div>
                </div>
            ))}
        </div>
    );
};
