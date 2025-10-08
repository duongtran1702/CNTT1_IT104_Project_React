import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { atminDispatch, atminSelector } from '../hooks/reduxHook';
import { createImage } from '../apis/image.api';
import { toast } from 'react-toastify';
import type { Recipe } from '../interfaces/recipe.interface';
import { createRecipe } from '../apis/recipe.api';
import { resetCreateRecipe } from '../redux/reducers/createRecipe.reducer';

interface PublishBoxProps {
    imageFile: File | null;
    onLoading: (a: boolean) => void;
}

export const PublishBox = ({ imageFile, onLoading }: PublishBoxProps) => {
    const nvg = useNavigate();
    const dispatch = atminDispatch();
    let link: string;
    const data: Omit<Recipe, 'id' | 'author'> = atminSelector(
        (s) => s.createRecipe
    );

    const dataLocal = localStorage.getItem('currentUser');
    const userLocal = dataLocal ? JSON.parse(dataLocal) : null;

    const validate = (): boolean => {
        if (!data.category || data.category.trim() === '') {
            toast.warn('Category is required!');
            return false;
        }

        if (!data.name || data.name.trim() === '') {
            toast.warn('Recipe name is required!');
            return false;
        }

        if (!data.description || data.description.trim() === '') {
            toast.warn('Description is required!');
            return false;
        }

        if (!data.totalTime || !data.prepTime) {
            toast.warn('Preparation and total time must be set!');
            return false;
        }

        if (!data.protions) {
            toast.warn('Field portions can not be empty');
            return false;
        }

        if (!data.ingredients || data.ingredients.length === 0) {
            toast.warn('At least one ingredient is required!');
            return false;
        }

        if (!data.cookingSteps || data.cookingSteps[0].content === '') {
            toast.warn('At least one cooking step is required!');
            return false;
        }

        return true;
    };

    const handleCreate = async () => {
        if (!imageFile) {
            toast.warn('Cannot publish recipe without image!');
            return;
        }

        if (!validate()) return;

        try {
            onLoading(true);

            const imageResult = await dispatch(
                createImage({ file: imageFile })
            );

            if (imageResult.meta.requestStatus !== 'fulfilled') {
                toast.error('Image upload failed!');
                return;
            }

            link = imageResult.payload as string;

            const recipe: Recipe = {
                ...data,
                id: crypto.randomUUID(),
                image: link,
                author: userLocal.username,
            };

            const recipeResult = await dispatch(createRecipe(recipe));

            if (recipeResult.meta.requestStatus === 'fulfilled') {
                toast.success('Recipe published successfully!');
                dispatch(resetCreateRecipe());
                nvg('/recipes');
            } else {
                toast.error('Failed to publish recipe!');
            }
        } catch (err) {
            console.error('Error while creating recipe:', err);
            toast.error('Unexpected error occurred!');
        } finally {
            onLoading(false);
        }
    };

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
                onClick={handleCreate}
            >
                Publish
            </Button>
        </div>
    );
};
