import { Link } from 'react-router';
import { Meal } from '../types/Meal';

type Props = {
  meal: Meal;
};

export const MealCard: React.FC<Props> = ({ meal }) => {
  const { strMealThumb, strMeal, strCategory, strArea, idMeal } = meal;

  const addToLocalStorage = (meal) => {
    localStorage.setItem('meals', meal.idMeal);
  };

  return (
    <Link to={`/meals/${idMeal}`} className="group">
      <img
        src={strMealThumb}
        alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
      />
      <div className="flex justify-between mt-4">
        <h3 className="mt-2 text-lg font-bold text-gray-700">{strMeal}</h3>
        <button
          className="rounded-lg bg-blue-200 p-2"
          onClick={(event) => {
            event.preventDefault();
            addToLocalStorage(meal);
          }}
        >
          Add to bucket
        </button>
      </div>

      <div className="flex justify-between">
        <p className="mt-2 text-sm font-medium text-gray-600">Category:</p>
        <span className="mt-1 text-sm font-medium text-green-900">
          {strCategory}
        </span>
      </div>
      <div className="flex justify-between">
        <p className="mt-1 text-sm font-medium text-gray-600">Origin:</p>
        <span className="mt-1 text-sm font-medium text-green-900">
          {strArea}
        </span>
      </div>
    </Link>
  );
};
