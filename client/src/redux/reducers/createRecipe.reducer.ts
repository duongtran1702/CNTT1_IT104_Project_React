import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    FoodServing,
    Ingredient,
    MicroNutrients,
    Recipe,
} from '../../interfaces/recipe.interface';
import { toast } from 'react-toastify';
import type { Food } from '../../interfaces/foods.interface';

export const initialRecipeValues: Omit<Recipe, 'id' | 'author'> = {
    image: null,
    like: '0',
    category: '',

    name: '',
    description: '',
    totalTime: '',
    prepTime: '',
    finalWeight: '',
    protions: '',

    ingredients: [],
    cookingSteps: [{ id: 1, content: '', editable: true }],

    calories: 0,
    fat: 0,
    carb: 0,
    protein: 0,
    fiber: 0,
    weight: 0,

    micro: {
        cholesterol: 0,
        sodium: 0,
        water: 0,
        vitaminA: 0,
        vitaminB6: 0,
        vitaminB12: 0,
        vitaminC: 0,
        vitaminD: 0,
        vitaminE: 0,
        vitaminK: 0,
        starch: 0,
        lactose: 0,
        alcohol: 0,
        caffeine: 0,
        sugars: 0,
        calcium: 0,
        iron: 0,
        magnesium: 0,
        phosphorus: 0,
        potassium: 0,
        zinc: 0,
        copper: 0,
        fluoride: 0,
        manganese: 0,
        selenium: 0,
        thiamin: 0,
        riboflavin: 0,
        niacin: 0,
        pantothenicAcid: 0,
        folateTotal: 0,
        folicAcid: 0,
        transFats: 0,
        saturatedFats: 0,
        monoFats: 0,
        polyFats: 0,
        chloride: 0,
    },
};

export const createRecipeStore = createSlice({
    name: 'createRecipe',
    initialState: initialRecipeValues,
    reducers: {
        setCreateRecipe: (
            state,
            action: PayloadAction<Partial<Omit<Recipe, 'id'>>>
        ) => {
            Object.assign(state, action.payload);
        },

        resetCreateRecipe: () => {
            return initialRecipeValues;
        },

        setDetailRecipe: (state, action: PayloadAction<Recipe>) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id, author, ...rest } = action.payload;
            Object.assign(state, rest);
        },

        addMainIng: (state, action: PayloadAction<Ingredient>) => {
            const idx = state.ingredients.findIndex(
                (i) => i.main.id === action.payload.main.id
            );
            if (idx !== -1) {
                state.ingredients[idx].main.serving +=
                    action.payload.main.serving;
            } else {
                state.ingredients.push(action.payload);
                toast.success('Add ingredient successful!');
            }
        },

        addEquivalentIng: (
            state,
            action: PayloadAction<{
                mainId: number;
                equivalent: FoodServing;
            }>
        ) => {
            const { mainId, equivalent } = action.payload;
            const ingredient = state.ingredients.find(
                (ing) => ing.main.id === mainId
            );

            if (ingredient) {
                if (action.payload.equivalent.id === ingredient.main.id) {
                    toast.error(
                        'Equivalent ingredient cannot be the same as main ingredient!'
                    );
                } else {
                    const exists = ingredient.equivalents.find(
                        (eq) => eq.id === equivalent.id
                    );
                    if (exists) {
                        // Nếu muốn cộng serving nếu đã tồn tại
                        exists.serving += equivalent.serving;
                    } else {
                        ingredient.equivalents.push(equivalent);
                    }
                }
            }
        },

        calMacronutrients: (state, action: PayloadAction<Food[]>) => {
            const foods = action.payload;

            // 🟢 Khởi tạo tổng macro
            let totalProtein = 0;
            let totalCarb = 0;
            let totalFat = 0;
            let totalFiber = 0;
            let totalWeight = 0;

            // 🟢 Khởi tạo tổng micro
            const totalMicro: MicroNutrients = {
                cholesterol: 0,
                sodium: 0,
                water: 0,
                vitaminA: 0,
                vitaminB6: 0,
                vitaminB12: 0,
                vitaminC: 0,
                vitaminD: 0,
                vitaminE: 0,
                vitaminK: 0,
                starch: 0,
                lactose: 0,
                alcohol: 0,
                caffeine: 0,
                sugars: 0,
                calcium: 0,
                iron: 0,
                magnesium: 0,
                phosphorus: 0,
                potassium: 0,
                zinc: 0,
                copper: 0,
                fluoride: 0,
                manganese: 0,
                selenium: 0,
                thiamin: 0,
                riboflavin: 0,
                niacin: 0,
                pantothenicAcid: 0,
                folateTotal: 0,
                folicAcid: 0,
                transFats: 0,
                saturatedFats: 0,
                monoFats: 0,
                polyFats: 0,
                chloride: 0,
            };

            // 🟢 Hàm format số: giữ 1 chữ số thập phân
            const formatNumber = (num: number): number =>
                Math.round((num + Number.EPSILON) * 10) / 10;

            // 🟢 Tính macro và micro
            state.ingredients.forEach((ingredient) => {
                const foodData = foods.find((f) => f.id === ingredient.main.id);
                if (!foodData) return;

                const serving = ingredient.main.serving;

                // Macro
                totalProtein += Number(foodData.protein) * serving;
                totalCarb += Number(foodData.carbohydrate) * serving;
                totalFat += Number(foodData.fat) * serving;
                totalFiber += Number(foodData.fiber || 0) * serving;
                totalWeight += Number(foodData.quantity || 0) * serving;

                // Micro
                (Object.keys(totalMicro) as (keyof MicroNutrients)[]).forEach(
                    (key) => {
                        totalMicro[key] += Number(foodData[key] || 0) * serving;
                    }
                );
            });

            // 🟢 Cập nhật state macro

            state.protein = formatNumber(totalProtein);
            state.carb = formatNumber(totalCarb);
            state.fat = formatNumber(totalFat);
            state.fiber = formatNumber(totalFiber);
            state.weight = formatNumber(totalWeight);
            state.calories = formatNumber(
                totalProtein * 4 + totalCarb * 4 + totalFat * 9
            );

            // 🟢 Cập nhật state micro
            const formattedMicro: MicroNutrients = {} as MicroNutrients;
            (Object.keys(totalMicro) as (keyof MicroNutrients)[]).forEach(
                (key) => {
                    formattedMicro[key] = formatNumber(totalMicro[key]);
                }
            );
            state.micro = formattedMicro;
        },
    },
});

export const {
    setCreateRecipe,
    resetCreateRecipe,
    addMainIng,
    addEquivalentIng,
    calMacronutrients,
    setDetailRecipe
} = createRecipeStore.actions;

export const createRecipeReducer = createRecipeStore.reducer;
