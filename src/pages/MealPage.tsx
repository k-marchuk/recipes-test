import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { getMealById } from '../api';
import { Meal } from '../types/Meal';

export const MealPage = () => {
  const { mealId } = useParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['meal', mealId],
    queryFn: () => getMealById(Number(mealId)),
  });

  if (isPending) {
    return <div>Is loading...</div>;
  }
  const meal = data?.meals?.[0];

  if (!meal) {
    return <div>No meals foud</div>;
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof Meal];
    const measure = meal[`strMeasure${i}` as keyof Meal];

    if (ingredient && measure) {
      ingredients.push({ [ingredient as string]: measure });
    }
  }

  const {
    strMeal,
    strArea,
    strCategory,
    strInstructions,
    strMealThumb,
    strSource,
    strYoutube,
  } = meal;

  return (
    <div className="max-w-2xl flex flex-col mx-auto py-10 px-20 items-center">
      {isPending && <p>Loading...</p>}
      {isError && <p className="has-text-danger">{error.message}</p>}
      <h3 className="mb-4 text-lg font-bold text-gray-700">{strMeal}</h3>
      <div>
        <img
          src={strMealThumb}
          width={400}
          height={400}
          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
          className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
        />
        <div className="flex justify-between">
          <p className="mt-2 text-sm font-medium text-gray-600">Category:</p>
          <span className="mt-1 text-sm font-medium text-green-900">
            {strCategory}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="mt-2 text-sm font-medium text-gray-600">Origin:</p>
          <span className="mt-1 text-sm font-medium text-green-900">
            {strArea}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="mt-2 text-sm font-medium text-gray-600">
            Recipe`s source:
          </p>
          <Link
            to={strSource}
            className="mt-1 text-sm font-medium text-green-900"
          >
            {strSource}
          </Link>
        </div>
        <p className="mt-4 text-md font-medium text-gray-600 underline">
          Ingredients:
        </p>
        <div className="flex flex-col">
          {ingredients.map((ingredient, index) => {
            return (
              <p
                className="mt-2 text-sm font-medium text-gray-600"
                key={`${ingredient} + ${index}`}
              >
                {Object.keys(ingredient)[0]}:{' '}
                {Object.values(ingredient)[0] as string}
              </p>
            );
          })}
        </div>

        <p className="mt-4 text-md font-medium text-gray-600 underline">
          Instructions:
        </p>
        <p className="mt-2 text-sm font-medium text-gray-500">
          {strInstructions}
        </p>
        <div className="flex justify-between">
          <Link to={strYoutube}>
            <p className="mt-2 text-sm font-medium text-gray-600">
              Watch on YouTube
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
