export interface FoodResponse {
    id:               number;
    user_id:          number;
    name:             string;
    description:      string;
    long_description: string;
    kcal:             number;
    proteins:         number;
    carbohydrates:    number;
    fats:             number;
    fiber:            number;
    vitamins:         string;
    minerals:         string;
    image:            string;
    shared:           number;
}
