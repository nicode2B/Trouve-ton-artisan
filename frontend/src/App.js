// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';       
import SearchResults from './pages/SearchResults'; 
import ArtisanDetail from './pages/ArtisanDetail'; 
import NotFound from './pages/NotFound';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LegalPage from './pages/LegalPage';
import './styles/custom.scss';


function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100">
        

        <Header /> 
        
        <main className="flex-grow-1"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recherche" element={<SearchResults />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} /> 
            <Route path="/mentions-legales" element={<LegalPage />} />
            <Route path="/donnees-personnelles" element={<LegalPage />} />
            <Route path="/accessibilite" element={<LegalPage />} />
            <Route path="/cookies" element={<LegalPage />} />
            <Route path="*" element={<NotFound />} /> 
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;