import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "@/components/HomePage";
import CreatePage from "./components/CreatePage";
import ErrorPage from "./components/error-page";
import StopPage from "./components/StopPage";
import InvitePage from "./components/InvitePage";
import { LoadingProvider, useLoading } from './components/top-loader/LoadingContext';

const LoadingHandler = () => {
  const { startLoading, stopLoading } = useLoading();
  const location = useLocation();

  useEffect(() => {
    stopLoading();
  }, [location, startLoading, stopLoading]);

  return null; // This component doesn't render anything
};

function App() {
  return (
    <LoadingProvider>
      <Router>
        <LoadingHandler />
        <Layout>
          <Routes>
            <Route path="/create" element={<CreatePage />} />
            <Route path="/event/:eventId/:uid?" element={<HomePage />} />
            <Route path="/stop" element={<StopPage />} />
            <Route path="/" element={<InvitePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Layout>
      </Router>
    </LoadingProvider>
  );
}

export default App;
