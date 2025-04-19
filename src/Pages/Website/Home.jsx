// src/pages/Home/HomePage.jsx
import React from 'react';
import Navbar from '../../Components/website/Home/Navbar';
import HeroSection from '../../Components/website/Home/HeroSection';
import CategoriesSection from '../../Components/website/Home/CategoriesSection';
import Footer from '../../Components/website/Home/Footer';

const HomePage = () => {
  return (
    <div className="bg-transparent text-white min-h-screen">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <Footer />
    </div>
  );
};

export default HomePage;
