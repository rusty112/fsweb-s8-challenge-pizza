import React from 'react';
import { Link } from 'react-router-dom'; // Link bileşenini import ediyoruz

const Options = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Seçenekler Sayfası</h1>
      <p>Bu sayfa şu anda yapım aşamasındadır.</p>
      
      {/* Ana sayfaya ("/") yönlendiren link */}
      <br /> {/* Biraz boşluk bırakmak için */}
      <Link to="/">Ana Sayfaya Dön</Link>
    </div>
  );
};

export default Options;