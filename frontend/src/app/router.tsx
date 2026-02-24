import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import { Settings } from "../pages/Setting";
import { Analytics } from "../pages/Analytics";
import { Reports } from "../pages/Reports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ],
  },
]);
