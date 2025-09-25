import React from 'react';
import { useLocation, Link } from 'react-router-dom';
// import './Success.css'; // Kendi CSS dosyanızı import edebilirsiniz

const Success = () => {
  const location = useLocation();
  const siparis = location.state?.siparis;

  // Eğer sipariş verisi yoksa (örn. direkt URL'den gelindiyse)
  if (!siparis) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Sipariş Detayı Bulunamadı</h1>
        <p>Geçerli bir sipariş bulunamadı.</p>
        <Link to="/">Ana Sayfaya Dön</Link>
      </div>
    );
  }

  // Sipariş verisi varsa, detayları göster
  const secimlerTutar = siparis.malzemeler.length * 5 * siparis.adet;

  return (
    <div className="success-container" style={{ backgroundColor: '#CE2829', color: 'white', minHeight: '100vh', padding: '2rem' }}>
      <header className="success-header" style={{ textAlign: 'center' }}>
        {/* BAŞLIĞI LİNK İLE SARDIK */}
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Teknolojik Yemekler</h1>
        </Link>
      </header>
      <main className="success-main" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <p style={{ fontStyle: 'italic', fontSize: '1.5rem' }}>lezzetin yolda</p>
        <h2 style={{ fontSize: '3rem', margin: '1rem 0' }}>SİPARİŞ ALINDI</h2>
        
        <hr style={{ width: '200px', margin: '2rem auto' }} />

        <div className="siparis-ozeti">
          <h3 style={{ fontWeight: 'normal' }}>Position Absolute Acı Pizza</h3>
          <p>Boyut: <strong>{siparis.boyut}</strong></p>
          <p>Hamur: <strong>{siparis.hamur}</strong></p>
          <p>Ek Malzemeler: <strong>{siparis.malzemeler.join(', ')}</strong></p>
        </div>

        <div className="siparis-toplami" style={{ border: '1px solid white', maxWidth: '300px', margin: '3rem auto', padding: '1rem' }}>
          <h4>Sipariş Toplamı</h4>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Seçimler</span>
            <span>{secimlerTutar.toFixed(2)}₺</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
            <span>Toplam</span>
            <span>{siparis.fiyat.toFixed(2)}₺</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Success;
     