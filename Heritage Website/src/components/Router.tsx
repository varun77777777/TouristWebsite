import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import ExplorePage from '@/components/pages/ExplorePage';
import ScannerPage from '@/components/pages/ScannerPage';
import EmergencyPage from '@/components/pages/EmergencyPage';
import FoodPage from '@/components/pages/FoodPage';
import PlannerPage from '@/components/pages/PlannerPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "scanner",
        element: <ScannerPage />,
      },
      {
        path: "emergency",
        element: <EmergencyPage />,
      },
      {
        path: "food",
        element: <FoodPage />,
      },
      {
        path: "planner",
        element: <PlannerPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
