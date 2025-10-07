import type { Micronutrient } from "../components/MicronutrientCard";

export interface Ingredient {
    id: number;
    name: string;
    grams: number;
    equivalents: FoodEquivalent[];
}

export interface FoodEquivalent {
    id: number;
    quantity: number;
    unit: string;
    grams: number;
}

export interface FoodItem {
    id: number;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    grams: number;
    energy: number;
    fat: number;
    carbohydrate: number;
    protein: number;
}

export const mockFoodItems: FoodItem[] = [
    {
        id: 1,
        name: 'Keto 90 Second Bread',
        category: 'Community Recipes',
        quantity: 1,
        unit: 'portion',
        grams: 87,
        energy: 301,
        fat: 27,
        carbohydrate: 6,
        protein: 11,
    },
    {
        id: 2,
        name: 'Keto - Just Eggs',
        category: 'Community Recipes',
        quantity: 1,
        unit: 'portion',
        grams: 190,
        energy: 469,
        fat: 40,
        carbohydrate: 7,
        protein: 23,
    },
    {
        id: 3,
        name: 'Blueberry Lavender Breeze',
        category: 'Community Recipes',
        quantity: 1,
        unit: 'portion',
        grams: 113,
        energy: 14,
        fat: 0,
        carbohydrate: 3,
        protein: 0,
    },
    {
        id: 4,
        name: 'Jamaican Grapefruit',
        category: 'Community Recipes',
        quantity: 1,
        unit: 'portion',
        grams: 122,
        energy: 45,
        fat: 0,
        carbohydrate: 13,
        protein: 1,
    },
    {
        id: 5,
        name: 'Stewed Tomatoes',
        category: 'Community Recipes',
        quantity: 100,
        unit: 'grams',
        grams: 100,
        energy: 8,
        fat: 0,
        carbohydrate: 2,
        protein: 0,
    },
];

export interface IngredientItem {
    id: number;
    name: string;
    category: string;
    quantity: number;
    unit: string;
    grams: number;
    energy: number;
    fat: number;
    carbohydrate: number;
    protein: number;
}

export interface SelectedIngredient {
    id: number;
    name: string;
    grams: number;
}

export const micronutrientData: Micronutrient[] = [
    { name: 'Sodium', value: 0, unit: 'mg' },
    { name: 'Vitamin A', value: 4, unit: 'µg' },
    { name: 'Vitamin B-6', value: 0, unit: 'mg' },
    { name: 'Vitamin B-12', value: 0, unit: 'µg' },
    { name: 'Vitamin C', value: 14, unit: 'mg' },
    { name: 'Vitamin D (D2 + D3)', value: 0, unit: 'µg' },
    { name: 'Vitamin E', value: 0, unit: 'mg' },
    { name: 'Vitamin K', value: 1, unit: 'µg' },
    { name: 'Sugars', value: 9, unit: 'g' },
    { name: 'Calcium', value: 0, unit: 'mg' },
    { name: 'Iron', value: 0, unit: 'mg' },
    { name: 'Magnesium', value: 4, unit: 'mg' },
    { name: 'Phosphorus', value: 10, unit: 'mg' },
    { name: 'Potassium', value: 124, unit: 'mg' },
    { name: 'Zinc', value: 0, unit: 'mg' },
    { name: 'Copper', value: 0, unit: 'mg' },
    { name: 'Fluoride', value: 49, unit: 'µg' },
    { name: 'Manganese', value: 0, unit: 'mg' },
    { name: 'Selenium', value: 0, unit: 'µg' },
    { name: 'Thiamin', value: 0, unit: 'mg' },
    { name: 'Riboflavin', value: 0, unit: 'mg' },
    { name: 'Niacin', value: 0, unit: 'mg' },
    { name: 'Pantothenic acid', value: 0, unit: 'mg' },
    { name: 'Folate, total', value: 2, unit: 'µg' },
];
