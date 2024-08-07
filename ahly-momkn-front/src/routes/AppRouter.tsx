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
      { path: "home", element: <Home /> },
      { path: "/", element: <Home /> },
      { path: "service-agent", element: <ServiceAgent /> },
      { path: "services/:providerId", element: <Services /> },
      { path: "category", element: <ServicesCategory /> },
      { path: "category/:categoryId/providers", element: <ServicesProvider /> },
      { path: "admin/category", element: <AdminCategory /> },
      { path: "admin/providers", element: <AdminProviders /> },
      { path: "admin/services", element: <AdminServices /> },
      { path: "admin/agent", element: <AdminAgent /> },
      { path: "admin/reports", element: <AdminReports /> },
      { path: "admin/report/details/:id", element: <ReportDetails /> },
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
