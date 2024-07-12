import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Home,
  ServiceAgent,
  Services,
  ServicesCategory,
  ServicesProvider,
  ErrorPage,
  AdminCategory,
  AdminProviders,
  AdminAgent,
  AdminReports,
  AdminServices,
  Login,
} from "@pages/index";
import ReportDetails from "@components/AdminReport/ReportDetails";
import MainLayout from "src/layouts/MainLayout/MainLayout";
import ErrorLayout from "../layouts/ErrorLayout";
import DebugComponent from "@components/Debug";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "../contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/Home", element: <Home /> },
      { path: "/", element: <Home /> },

      { path: "/service-agent", element: <ServiceAgent /> },
      { path: "/services", element: <Services /> },
      {
        path: "/category",
        element: <ServicesCategory />,
        children: [
          {
            path: ":categoryId",
            element: <ServicesProvider />,
            children: [
              { path: "services", element: <Services /> },
              { path: "service-agent", element: <ServiceAgent /> },
            ],
          },
        ],
      },
      { path: "/admin/category", element: <AdminCategory /> },
      { path: "/admin/providers", element: <AdminProviders /> },
      { path: "/admin/services", element: <AdminServices /> },
      { path: "/admin/agent", element: <AdminAgent /> },
      { path: "/admin/reports", element: <AdminReports /> },
      { path: "admin/reports/details", element: <ReportDetails /> },
    ],
  },
  { path: "/login", element: <Login /> },
  {
    path: "*",
    element: <ErrorLayout />,
    children: [{ path: "*", element: <ErrorPage /> }],
  },
]);

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRouter;
