export interface Recipe {
    id: number;

    image: null | string;
    like: string;
    category: string;

    name: string;
    description: string;
    totalTime: string;
    prepTime: string;
    finalWeight: string;
    protions: string;

    ingredients: Ingredient[];

    cookingSteps: string[];
}

interface FoodServing {
    id: string;
    serving: string;
}

export interface Ingredient {
    main: FoodServing;
    equivalents: FoodServing[];
}

export interface InitialRecipeProps {
    recipes: Recipe[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: null | undefined | string;
    recipeDetail: Recipe | null;
}
