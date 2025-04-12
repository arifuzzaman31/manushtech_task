import { BrowserRouter, Route, Routes } from "react-router-dom";
import appRoutes from "../constants/AppRoutes";
import ProtectedPage from "../components/Layouts/ProtectedPage";
import NoPageFound from "../components/Global/NoPageFound";
import AppLayout from "../components/Layouts/AppLayout";

const RouteWrapper = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {appRoutes.map((route) => {
          const { path, Element, isProtected, isIndexUrl } = route;
          if (isProtected) {
            return (
              <Route
                key={path}
                element={
                  <ProtectedPage>
                    <AppLayout />
                  </ProtectedPage>
                }
              >
                <Route index={isIndexUrl} path={path} element={<Element />} />
              </Route>
            );
          } else {
            return (
              <Route
                key={path}
                index={isIndexUrl}
                path={path}
                element={<Element />}
              />
            );
          }
        })}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteWrapper;
