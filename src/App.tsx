import AppLayout from "./components/layout/AppLayout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./components/base/Loading";
import { lazy, Suspense, useEffect } from "react";

import { ToastContainer } from "react-toastify";

import { useTokenStore } from "./store";
import Home from "./pages/Home";

const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  const initializeStore = useTokenStore((state) => state.initializeStore);

  useEffect(() => {
    initializeStore();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <AppLayout>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />

            {/* Redirect for unknown routes */}
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
