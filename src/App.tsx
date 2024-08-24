import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Pages/Home';
import GiftList from './views/Pages/GiftList';
import GuestRegistration from './views/Pages/GuestRegistration';
import Felicidades from './views/Pages/Felicidades';
import { GuestProvider } from './context/GuestContext/GuestContext';
import CustomBar from './shared/components/CustomBar';
import Album1 from './views/Pages/Album1';
import Instrucoes from './views/Pages/Instruções';

const App: React.FC = () => {
  return (
    <GuestProvider>
      <Router>
          <CustomBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/album" element={<Album1 />} />
            <Route path="/giftlist" element={<GiftList />} />
            <Route path="/guestregistration" element={<GuestRegistration />} />
            <Route path="/felicidades" element={<Felicidades />} />
            <Route path="/instrucoes" element={<Instrucoes />} />
          </Routes>
      </Router>
    </GuestProvider>
  );
};

export default App;
