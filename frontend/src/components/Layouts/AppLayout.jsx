import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import {
  IconDashboard,
  IconBox,
  IconDiscount2,
  IconShoppingCart,
  IconLogout,
} from "@tabler/icons-react";
import { authActions } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";

const navLinks = [
  { icon: IconDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: IconBox, label: "Products", path: "/products" },
  { icon: IconDiscount2, label: "Promotions", path: "/promotions" },
  { icon: IconShoppingCart, label: "Orders", path: "/orders" },
];

export default function AppLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.signout());
    window.location.href = "/";
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div className="space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                to={link.path}
                key={link.label}
                className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <IconLogout className="w-5 h-5" />
          Logout
        </button>
      </aside>

      {/* Main layout */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 px-6 flex items-center justify-between border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold">
              MS
            </div>
            <span className="font-semibold">ManushTech Admin</span>
          </div>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-auto flex-1 bg-gray-50">
          <Outlet /> {/* This was missing - now it will render child routes */}
        </main>
      </div>
    </div>
  );
}