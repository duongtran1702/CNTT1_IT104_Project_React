export interface Food {
    id: number;
    name: string;
    category: string;
    source: string;
    quantity: string;
    calories: string;
    protein: string;
    fat: string;
    carbohydrate: string;
    cholesterol: string;
    fiber: string;
    sodium: string;
    water: string;
    vitaminA: string;
    vitaminB6: string;
    vitaminB12: string;
    vitaminC: string;
    vitaminD: string;
    vitaminE: string;
    vitaminK: string;
    starch: string;
    lactose: string;
    alcohol: string;
    caffeine: string;
    sugars: string;
    calcium: string;
    iron: string;
    magnesium: string;
    phosphorus: string;
    potassium: string;
    zinc: string;
    copper: string;
    fluoride: string;
    manganese: string;
    selenium: string;
    thiamin: string;
    riboflavin: string;
    niacin: string;
    pantothenicAcid: string;
    folateTotal: string;
    folicAcid: string;
    transFats: string;
    saturatedFats: string;
    monoFats: string;
    polyFats: string;
    chloride: string;
}

export interface InitialFoodProps {
    foods: Food[];
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: null | undefined | string;
    foodDetail: Food | null;
}
