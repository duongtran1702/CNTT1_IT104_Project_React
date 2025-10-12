import { useState, useRef, useEffect } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { setCreateRecipe } from '../redux/reducers/createRecipe.reducer';
import type { CookingStep, Recipe } from '../interfaces/recipe.interface';

export const CookingMethod = () => {
    const dispatch = atminDispatch();
    const data: Omit<Recipe, 'id' | 'author'> = atminSelector(
        (s) => s.createRecipe
    );
    const [steps, setSteps] = useState<CookingStep[]>(data.cookingSteps);

    useEffect(() => {
        dispatch(setCreateRecipe({ cookingSteps: steps }));
    }, [dispatch, steps]);

    const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

    // 🟢 Khi click ra ngoài => disable tất cả step
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                !textareaRefs.current.some(
                    (ref) => ref && ref.contains(e.target as Node)
                )
            ) {
                setSteps((prev) =>
                    prev.map((s) => ({ ...s, editable: false }))
                );
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 🟢 Tự động điều chỉnh chiều cao textarea
    const autoResize = (el: HTMLTextAreaElement) => {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    useEffect(() => {
        textareaRefs.current.forEach((el) => {
            if (el) autoResize(el);
        });
    }, [steps]);

    // 🟢 Cập nhật nội dung bước
    const updateStepContent = (id: number, content: string) => {
        setSteps((prev) =>
            prev.map((step) => (step.id === id ? { ...step, content } : step))
        );
    };

    // 🟢 Thêm step mới khi Enter
    const addStep = () => {
        const last = steps[steps.length - 1];
        if (!last.content.trim()) return;

        setSteps((prev) => [
            ...prev.map((s) => ({ ...s, editable: false })),
            { id: prev.length + 1, content: '', editable: true },
        ]);

        setTimeout(() => {
            const newTextarea = textareaRefs.current[steps.length];
            if (newTextarea) {
                newTextarea.focus();
                // ✅ focus tới cuối nội dung (nếu có)
                const val = newTextarea.value;
                newTextarea.value = '';
                newTextarea.value = val;
                autoResize(newTextarea);
            }
        }, 50);
    };

    // 🟢 Xóa step
    const deleteStep = (id: number) => {
        if (steps.length === 1) return;
        const filtered = steps.filter((s) => s.id !== id);
        const renumbered = filtered.map((s, i) => ({
            ...s,
            id: i + 1,
        }));
        setSteps(renumbered);
    };

    // 🟢 Bật edit mode + focus đến cuối
    const enableEdit = (id: number) => {
        setSteps((prev) =>
            prev.map((s) => ({
                ...s,
                editable: s.id === id,
            }))
        );
        setTimeout(() => {
            const textarea = textareaRefs.current[id - 1];
            if (textarea) {
                textarea.focus();
                // ✅ focus tới cuối dòng khi click bút
                const val = textarea.value;
                textarea.value = '';
                textarea.value = val;
                autoResize(textarea);
            }
        }, 50);
    };

    return (
        <div className="bg-gray-100 h-fit mt-4 flex justify-center">
            <div className="bg-white rounded-[8px] shadow-sm w-[860px] p-10">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-4xl font-light text-gray-600 mb-2">
                        Cooking method
                    </h2>
                    <p className="text-base text-gray-400">
                        Give instructions to prepare this recipe
                    </p>
                </div>

                {/* Steps List */}
                <div className="flex flex-col gap-2">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className="flex border border-gray-300 bg-white group"
                        >
                            <div className="w-10 border-r bg-gray-50 flex items-center border-gray-300 justify-center text-gray-500 font-normal text-xl">
                                {step.id}
                            </div>

                            <div className="flex-1 flex items-center px-4">
                                <textarea
                                    ref={(el) => {
                                        textareaRefs.current[index] = el;
                                    }}
                                    value={step.content}
                                    onChange={(e) => {
                                        updateStepContent(
                                            step.id,
                                            e.target.value
                                        );
                                        autoResize(e.target);
                                    }}
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const pastedText =
                                            e.clipboardData.getData('text');
                                        // 🧹 Chuẩn hóa: bỏ khoảng trắng và dòng trống thừa
                                        const cleaned = pastedText
                                            .replace(/\r\n/g, '\n') // chuẩn hóa newline
                                            .replace(/\n{2,}/g, '\n') // bỏ dòng trống kép trở lên
                                            .trim();

                                        // Chèn text vào đúng vị trí con trỏ
                                        const target =
                                            e.target as HTMLTextAreaElement;
                                        const start = target.selectionStart;
                                        const end = target.selectionEnd;
                                        const newValue =
                                            target.value.substring(0, start) +
                                            cleaned +
                                            target.value.substring(end);

                                        updateStepContent(step.id, newValue);
                                        setTimeout(
                                            () => autoResize(target),
                                            50
                                        );
                                    }}

                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            addStep();
                                        }
                                    }}
                                    placeholder={
                                        step.editable
                                            ? 'Add new cooking method'
                                            : 'Click pencil to edit'
                                    }
                                    disabled={!step.editable}
                                    wrap="soft"
                                    className={`w-full text-base bg-transparent overflow-hidden resize-none ${
                                        step.editable
                                            ? 'text-gray-700'
                                            : 'text-gray-500 bg-gray-50 cursor-not-allowed'
                                    } placeholder:text-gray-400 placeholder:italic focus:outline-none focus:ring-0`}
                                    rows={1}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col justify-center items-center border-l border-gray-300">
                                <button
                                    aria-label="Edit step"
                                    onClick={() => enableEdit(step.id)}
                                    className="text-teal-400 hover:text-teal-500 p-2"
                                >
                                    <Pencil className="cursor-pointer" />
                                </button>
                            </div>
                            {step.content.trim() !== '' && steps.length > 1 && (
                                <div className="flex justify-center items-center border-l border-gray-300">
                                    <button
                                        aria-label="Delete step"
                                        onClick={() => deleteStep(step.id)}
                                        className="text-orange-300 hover:text-orange-500 transition p-2"
                                    >
                                        <Trash2 className="cursor-pointer" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add Step Button */}
                <button
                    onClick={addStep}
                    className="mt-6 flex items-center gap-2 text-teal-500 hover:text-teal-600 transition cursor-pointer"
                >
                    <Plus className="w-5 h-5" />
                    <span className="text-base">Add new step</span>
                </button>
            </div>
        </div>
    );
};
