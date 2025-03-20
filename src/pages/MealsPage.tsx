import { useQuery } from '@tanstack/react-query';
import { getMeals, getMealsCategories } from '../api';
import debounce from 'lodash/debounce';
import { MealCard } from '../components/MealCard';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Pagination from 'rc-pagination';

export const MealsPage = () => {
  const [mealName, setMealName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const debouncedSetMealName = debounce(setMealName, 500);

  const {
    isPending,
    isError,
    data: mealsData,
    error,
  } = useQuery({
    queryKey: ['meals', mealName],
    queryFn: () => getMeals(mealName),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getMealsCategories(),
  });

  const categories = categoriesData?.meals.map(
    (category) => category.strCategory
  );
  useEffect(() => {
    scrollToTop();
  }, [page]);

  return (
    <div className="container flex flex-col mx-auto py-10 px-20 items-center">
      <p className="mt-1 text-lg font-medium text-gray-900 mb-10">Recipes</p>
      <div className="flex place-items-center gap-2  mb-10">
        <p className="text-sm text-gray-600">Search: </p>
        <input
          placeholder="Type a meal..."
          type="text"
          // value={mealName}
          onChange={(event) => debouncedSetMealName(event.target.value)}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>

      <div className="container flex gap-3 mb-5 flex-wrap">
        {categories?.map((category) => {
          return (
            <span
              key={category}
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === category ? '' : category
                );
              }}
              className={classNames(
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-gray-600   bg-gray-50 ring-1 ring-gray-500/10 ring-inset',
                {
                  'bg-yellow-50': selectedCategory === category,
                  'text-yellow-600': selectedCategory === category,
                }
              )}
            >
              {category}
            </span>
          );
        })}
      </div>

      <div className="grid xl:grid-cols-4 xl:gap-x-8 gap-3 gap-y-10 gap-x-5">
        {isPending && <p>Loading...</p>}
        {isError && <p className="has-text-danger">{error.message}</p>}
        {mealsData?.meals
          ?.filter(
            (meal) => meal.strCategory === selectedCategory || !selectedCategory
          )
          .slice((page - 1) * 10, page * 10)
          .map((meal) => {
            return <MealCard meal={meal} key={meal.idMeal} />;
          })}
      </div>

      {!error && !isPending && (
        <Pagination
          className="ant-pagination mt-10"
          current={page}
          total={mealsData.meals.length}
          pageSize={10}
          onChange={(currentPage) => setPage(currentPage)}
        />
      )}
    </div>
  );
};
