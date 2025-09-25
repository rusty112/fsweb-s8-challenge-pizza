import React from 'react';
// useNavigate'i hem butonlar hem de linkler için kullanabiliriz, ancak linkler için Link daha pratiktir.
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Teknolojik Yemekler</h1>
          </div>
          <nav className="nav">
            {/* Değişiklik: a etiketleri Link ile değiştirildi */}
            <Link to="/" className="nav-link">
              Ana Sayfa
            </Link>
            <Link to="/options" className="nav-link">
              Seçenekler
            </Link>
            <Link to="/order" className="nav-link">
              Sipariş Oluştur
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section (Bu kısım aynı kaldı) */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-subtitle">fırsatı kaçırma</p>
            <h1 className="hero-title">
              KOD ACIKTIRIR
              <br />
              PİZZA, DOYURUR
            </h1>
            <button className="hero-button" onClick={handleOrderClick}>
              ACIKTIM
            </button>
          </div>
          <div className="hero-image">
            <img
              src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Delicious Pizza"
            />
          </div>
        </div>
      </section>

      {/* Features Section (Bu kısım aynı kaldı) */}
      <section className="features">{/* ... içerik ... */}</section>

      {/* Menu Preview (Bu kısım aynı kaldı) */}
      <section className="menu-preview">{/* ... içerik ... */}</section>

      {/* CTA Section (Bu kısım aynı kaldı) */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Hemen Sipariş Ver!</h2>
            <p>
              Lezzetli pizzalarımızdan birini seç ve 30 dakika içinde kapında
              olsun
            </p>
            <button className="cta-button" onClick={handleOrderClick}>
              SİPARİŞ VER
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Teknolojik Yemekler</h3>
              <p>Kod yazarken acıkan geliştiriciler için özel lezzetler</p>
            </div>
            <div className="footer-section">
              <h4>Hızlı Linkler</h4>
              <ul>
                {/* Değişiklik: a etiketleri Link ile değiştirildi */}
                <li>
                  <Link to="/">Ana Sayfa</Link>
                </li>
                <li>
                  <Link to="/order">Menü</Link>
                </li>
                <li>
                  <Link to="/about">Hakkımızda</Link>
                </li>
                <li>
                  <Link to="/contact">İletişim</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>İletişim</h4>
              <p>📞 0555 123 45 67</p>
              <p>📧 info@teknolojikYemekler.com</p>
              <p>📍 İstanbul, Türkiye</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Teknolojik Yemekler. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
