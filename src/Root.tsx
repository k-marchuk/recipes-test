import { Navigate, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { MealPage } from './pages/MealPage';
import { MealsPage } from './pages/MealsPage';
import { BucketPage } from './pages/BucketPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Caches data for 5 mins.
      refetchOnWindowFocus: false,
    },
  },
});

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MealsPage />} />
          <Route path="home" element={<Navigate to="/meals" replace />} />
          <Route path="meals">
            <Route index element={<MealsPage />} />
            <Route path=":mealId" element={<MealPage />} />
          </Route>
          <Route path="favorites" element={<BucketPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};
