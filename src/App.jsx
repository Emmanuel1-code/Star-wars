import React from 'react'
import LoginPage from './components/LoginPage';
import Dashboard from './components/DashboardPage';
import Starship from './components/StarshipPage';
import People from './components/PeoplePage';
import Species from './components/SpeciesPage';
import Vehicles from './components/VehiclesPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <BrowserRouter>
       <Routes>
       <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/starships" element={<Starship />} />
        <Route path="/People" element={<People />} />
        <Route path="/Species" element={<Species />} />
        <Route path="/Vehicles" element={<Vehicles />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;