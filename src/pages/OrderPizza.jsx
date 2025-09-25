import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './OrderPizza.css';

const OrderPizza = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    isim: '',
    boyut: '',
    hamur: '',
    malzemeler: [],
    ozel: '',
    adet: 1,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const malzemeler = [
    'Pepperoni',
    'Sosis',
    'Kanada Jambonu',
    'Tavuk Izgara',
    'Soğan',
    'Domates',
    'Mısır',
    'Sucuk',
    'Jalapeno',
    'Sarımsak',
    'Biber',
    'Ananas',
    'Kabak',
  ];

  const boyutlar = [
    { value: 'kucuk', label: 'Küçük', price: 0 },
    { value: 'orta', label: 'Orta', price: 5 },
    { value: 'buyuk', label: 'Büyük', price: 10 },
  ];

  const hamurlar = ['İnce Hamur', 'Kalın Hamur', 'Orta Hamur'];

  const basePrice = 85.5;
  const malzemePrice = 5;

  const calculatePrice = () => {
    let price = basePrice;
    const selectedBoyut = boyutlar.find((b) => b.value === formData.boyut);
    if (selectedBoyut) {
      price += selectedBoyut.price;
    }
    price += formData.malzemeler.length * malzemePrice;
    return price * formData.adet;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.isim || formData.isim.length < 3) {
      newErrors.isim = 'İsim en az 3 karakter olmalıdır';
    }
    if (!formData.boyut) {
      newErrors.boyut = 'Pizza boyutu seçmelisiniz';
    }
    if (!formData.hamur) {
      newErrors.hamur = 'Hamur kalınlığı seçmelisiniz';
    }
    if (formData.malzemeler.length < 4) {
      newErrors.malzemeler = 'En az 4 malzeme seçmelisiniz';
    }
    if (formData.malzemeler.length > 10) {
      newErrors.malzemeler = 'En fazla 10 malzeme seçebilirsiniz';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMalzemeChange = (malzeme) => {
    setFormData((prev) => {
      const newMalzemeler = prev.malzemeler.includes(malzeme)
        ? prev.malzemeler.filter((m) => m !== malzeme)
        : [...prev.malzemeler, malzeme];
      return { ...prev, malzemeler: newMalzemeler };
    });
  };

  const handleAdetChange = (change) => {
    setFormData((prev) => ({ ...prev, adet: Math.max(1, prev.adet + change) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formun geçerli olup olmadığını kontrol ediyoruz.
    if (!isFormValid) {
      toast.error('Lütfen formu eksiksiz doldurun!');
      return;
    }

    setIsSubmitting(true);
    try {
      // Sipariş verilerini hazırlıyoruz.
      const orderPayload = {
        ...formData,
        fiyat: calculatePrice(),
        tarih: new Date().toISOString(),
      };

      console.log('Orijinal sipariş gönderiliyor:', orderPayload);
      const response = await axios.post(
        'https://reqres.in/api/users',
        orderPayload
      );

      console.log('API Yanıtı:', response.data);
      const orderWithResponse = {
        ...orderPayload,
        id: response.data.id,
        createdAt: response.data.createdAt,
      };

      toast.success('Siparişiniz başarıyla alındı!');

      // Başarılı olursa yönlendirme yapıyoruz.
      setTimeout(() => {
        navigate('/success', { state: { siparis: orderWithResponse } });
      }, 1000);
    } catch (error) {
      // Hata olursa kullanıcıyı bilgilendiriyoruz.
      console.error('Sipariş hatası:', error);
      toast.error('Sipariş gönderilirken bir API hatası oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const isFormValid =
    Object.keys(errors).length === 0 &&
    formData.isim &&
    formData.boyut &&
    formData.hamur &&
    formData.malzemeler.length >= 4;

  return (
    <div className="order-pizza">
      <header className="order-header">
        <div className="container">
          <h1 className="logo" onClick={() => navigate('/')}>
            Teknolojik Yemekler
          </h1>
        </div>
      </header>
      <div className="breadcrumb">
        <div className="container">
          <span onClick={() => navigate('/')} className="breadcrumb-link">
            Anasayfa
          </span>
          <span className="breadcrumb-separator"> - </span>
          <span className="breadcrumb-current">Sipariş Oluştur</span>
        </div>
      </div>
      <div className="container">
        <div className="order-content">
          <div className="pizza-info">
            <img
              src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Position Absolute Acı Pizza"
              className="pizza-image"
            />
            <div className="pizza-details">
              <h2>Position Absolute Acı Pizza</h2>
              <div className="pizza-price">
                <span className="price">{basePrice}₺</span>
              </div>
              <div className="pizza-rating">
                <span className="rating">4.9</span>
                <div className="stars">★★★★★</div>
                <span className="review-count">(200)</span>
              </div>
              <p className="pizza-description">
                Frontend Dev olarak hala position:absolute kullanıyorsan bu çok
                acı pizza tam sana göre. Pizza, domates, peynir ve genellikle
                çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel
                olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen,
                genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan
                oluşan İtalyan kökenli lezzetli bir yemektir.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="order-form">
            <div className="form-group">
              <label htmlFor="isim">İsim *</label>
              <input
                type="text"
                id="isim"
                name="isim"
                value={formData.isim}
                onChange={handleInputChange}
                placeholder="İsminizi girin"
                className={errors.isim ? 'error' : ''}
              />
              {errors.isim && (
                <span className="error-message">{errors.isim}</span>
              )}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Boyut Seç *</label>
                <div className="radio-group">
                  {boyutlar.map((boyut) => (
                    <label key={boyut.value} className="radio-label">
                      <input
                        type="radio"
                        name="boyut"
                        value={boyut.value}
                        checked={formData.boyut === boyut.value}
                        onChange={handleInputChange}
                      />
                      <span className="radio-custom"></span>
                      <span className="radio-text">
                        {boyut.label} {boyut.price > 0 && `(+${boyut.price}₺)`}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.boyut && (
                  <span className="error-message">{errors.boyut}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="hamur">Hamur Seç *</label>
                <select
                  id="hamur"
                  name="hamur"
                  value={formData.hamur}
                  onChange={handleInputChange}
                  className={errors.hamur ? 'error' : ''}
                >
                  <option value="">Hamur Kalınlığı</option>
                  {hamurlar.map((hamur) => (
                    <option key={hamur} value={hamur}>
                      {hamur}
                    </option>
                  ))}
                </select>
                {errors.hamur && (
                  <span className="error-message">{errors.hamur}</span>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Ek Malzemeler</label>
              <p className="malzeme-info">
                En az 4, en fazla 10 malzeme seçebilirsiniz. 5₺
              </p>
              <div className="checkbox-grid">
                {malzemeler.map((malzeme) => (
                  <label key={malzeme} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.malzemeler.includes(malzeme)}
                      onChange={() => handleMalzemeChange(malzeme)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className="checkbox-text">{malzeme}</span>
                  </label>
                ))}
              </div>
              {errors.malzemeler && (
                <span className="error-message">{errors.malzemeler}</span>
              )}
              <div className="malzeme-count">
                Seçilen malzeme sayısı: {formData.malzemeler.length}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ozel">Sipariş Notu</label>
              <textarea
                id="ozel"
                name="ozel"
                value={formData.ozel}
                onChange={handleInputChange}
                placeholder="Siparişinize eklemek istediğiniz bir not var mı?"
                rows="3"
              />
            </div>
            <div className="order-summary">
              <h3>Sipariş Toplamı</h3>
              <div className="quantity-selector">
                <button
                  type="button"
                  onClick={() => handleAdetChange(-1)}
                  className="quantity-btn"
                  disabled={formData.adet <= 1}
                >
                  -
                </button>
                <span className="quantity">{formData.adet}</span>
                <button
                  type="button"
                  onClick={() => handleAdetChange(1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Seçimler:</span>
                  <span>
                    {(
                      formData.malzemeler.length *
                      malzemePrice *
                      formData.adet
                    ).toFixed(2)}
                    ₺
                  </span>
                </div>
                <div className="summary-row total">
                  <span>Toplam:</span>
                  <span>{calculatePrice().toFixed(2)}₺</span>
                </div>
              </div>
              <button
                type="submit"
                className={`submit-btn ${
                  !isFormValid || isSubmitting ? 'disabled' : ''
                }`}
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? 'SİPARİŞ VERİLİYOR...' : 'SİPARİŞ VER'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderPizza;
