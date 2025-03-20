import { CategoriesResponse } from './types/CategoriesResponse';
import { MealResponse } from './types/Meal';
import { MealsData } from './types/MealsData';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export function getMeals(name: string): Promise<MealsData> {
  return fetch(API_URL + `/search.php?s=${name}`).then((response) =>
    response.json()
  );
}

export function getMealById(id: number): Promise<MealResponse> {
  return fetch(API_URL + `/lookup.php?i=${id}`).then((response) =>
    response.json()
  );
}

export function getMealsCategories(): Promise<CategoriesResponse> {
  return fetch(API_URL + `//list.php?c=list`).then((response) =>
    response.json()
  );
}
