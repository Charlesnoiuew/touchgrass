import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import About from './About';
import Lineup from './Lineup';
import Tickets from './Tickets';
import FAQ from './FAQ';
import ADA from './ADA';
import Partners from './Partners';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/lineup" element={<Lineup />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/ada" element={<ADA />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
