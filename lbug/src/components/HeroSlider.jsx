// src/components/HeroSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './HeroSlider.scss';

export default function HeroSlider() {
  const slides = [
    { id: 1, title: 'Season 1', img: '/assets/hero_s1.jpg', link: '/seasons/1' },
    { id: 2, title: 'Season 2', img: '/assets/hero_s2.jpg', link: '/seasons/2' },
    { id: 3, title: 'Season 3', img: '/assets/hero_s3.jpg', link: '/seasons/3' },
  ];
  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3500 }}
        loop
        pagination={{ clickable: true }}
      >
        {slides.map(s => (
          <SwiperSlide key={s.id}>
            <a href={s.link} className="slide" style={{ backgroundImage: `url(${s.img})` }}>
              <div className="overlay">
                <h2>{s.title}</h2>
                <button className="cta">View Season</button>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
