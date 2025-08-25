// src/components/SeasonNavigator.jsx
import { Link } from 'react-router-dom';
import { seasons } from '../data/seasons';
import './SeasonNavigator.scss';

export default function SeasonNavigator() {
  return (
    <section className="season-nav">
      <h3>Seasons</h3>
      <div className="grid">
        {seasons.map(s => (
          <Link key={s.id} to={`/seasons/${s.id}`} className="card">
            <img src={s.cover} alt={s.title} />
            <div className="meta">
              <strong>{s.title}</strong>
              <span>{s.year} · {s.episodes} eps</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
