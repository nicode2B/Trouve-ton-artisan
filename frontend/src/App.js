// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';       
import SearchResults from './pages/SearchResults'; 
import ArtisanDetail from './pages/ArtisanDetail'; 
import NotFound from './pages/NotFound'; // Importe la page 404
import Header from './components/layout/Header'; // Importe l'en-tête
import Footer from './components/layout/Footer'; // Importe le pied de page
import LegalPage from './pages/LegalPage';
import './styles/custom.scss';


function App() {
  return (
    <Router>
      <div className="App d-flex flex-column min-vh-100"> {/* d-flex pour coller le footer en bas */}
        
        {/* Le Header s'affiche sur toutes les pages */}
        <Header /> 
        
        <main className="flex-grow-1"> 
          <Routes>
            {/* Routes existantes */}
            <Route path="/" element={<Home />} />
            <Route path="/recherche" element={<SearchResults />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} /> 
            <Route path="/mentions-legales" element={<LegalPage />} />
            <Route path="/donnees-personnelles" element={<LegalPage />} />
            <Route path="/accessibilite" element={<LegalPage />} />
            <Route path="/cookies" element={<LegalPage />} />
            
            {/* ROUTE 404 : Attrape toutes les autres URL (Doit être la dernière) */}
            <Route path="*" element={<NotFound />} /> 
            
          </Routes>
        </main>
        
        {/* Le Footer s'affiche sur toutes les pages */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;