import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router"; // Import Navigate and Outlet
import "./App.css";
import LoginPage from "./Pages/Auth/Login";
import Home from "./Pages/Website/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import AllAds from "./Components/Admin/AllAds";
import RequireAuth from './Pages/Auth/RequireAuth';
import EditAd from "./Components/Admin/edit-ad/EditAd";
import CreateAd from "./Components/Admin/create-ad/CreateAd";
import MainCategories from "./Pages/Website/MainCategories";
import ItemDetailsPage from "./Pages/Website/ItemDetailsPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Public Route  */}
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<MainCategories />} />
          <Route path="/items/:id" element={<ItemDetailsPage />} />


          {/* Protected Route  */}
          <Route 
            path="/admin/dashboard" 
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route path="add-ads" element={<CreateAd/>} />
            <Route path="show-ads" element={<AllAds />} />
            <Route path="edit-ad/:id" element={<EditAd />} />

          </Route>

          <Route path="/*" element={<NotFoundPage />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;