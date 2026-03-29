import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import Overview from "../pages/Overview";
import { Settings } from "../pages/Setting";
import { Analytics } from "../pages/Analytics";
import { Reports } from "../pages/Reports";
import { Insights } from "../pages/Insights";
import { Login } from "../pages/Login";
import ProtectedRoute from "../components/ui/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "analytics",
            element: <Analytics />,
          },
          {
            path: "reports",
            element: <Reports />,
          },
          {
            path: "insights",
            element: <Insights />,
          },
        ],
      },
    ],
  },
]);
