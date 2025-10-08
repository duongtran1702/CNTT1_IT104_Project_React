export interface Recipe {
    id: string;
    author:string

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

    cookingSteps: CookingStep[];

    macro: Macronutrients;
    micro: MicroNutrients;
}

export interface Macronutrients {
    calories: number;
    fat: number;
    carb: number;
    protein: number;
    fiber: number;
}

export interface MicroNutrients {
    cholesterol: number;
    sodium: number;
    water: number;
    vitaminA: number;
    vitaminB6: number;
    vitaminB12: number;
    vitaminC: number;
    vitaminD: number;
    vitaminE: number;
    vitaminK: number;
    starch: number;
    lactose: number;
    alcohol: number;
    caffeine: number;
    sugars: number;
    calcium: number;
    iron: number;
    magnesium: number;
    phosphorus: number;
    potassium: number;
    zinc: number;
    copper: number;
    fluoride: number;
    manganese: number;
    selenium: number;
    thiamin: number;
    riboflavin: number;
    niacin: number;
    pantothenicAcid: number;
    folateTotal: number;
    folicAcid: number;
    transFats: number;
    saturatedFats: number;
    monoFats: number;
    polyFats: number;
    chloride: number;
}

export interface FoodServing {
    id: number;
    serving: number;
}

export interface Ingredient {
    main: FoodServing;
    equivalents: FoodServing[];
}

export interface CookingStep {
    id: number;
    content: string;
    editable: boolean;
}

export interface InitialRecipeProps {
    recipes: Recipe[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: null | undefined | string;
    recipeDetail: Recipe | null;
    loading: boolean;
}
