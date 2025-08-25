// src/components/CommunityHighlights.jsx
// 파이어베이스 연결 전: 더미로 UI 먼저
import { Link } from 'react-router-dom';
import './CommunityHighlights.scss';

export default function CommunityHighlights() {
  const hot = [
    { id:'p1', title:'S5 최애 에피소드 토론', snippet:'나는 에피 12가 최고…', likes:42 },
    { id:'p2', title:'각 시즌 명장면 정리', snippet:'클립 링크 모음', likes:31 },
  ];
  return (
    <section className="community">
      <div className="head">
        <h3>Community Hot</h3>
        <Link to="/community" className="more">See all</Link>
      </div>
      <ul className="list">
        {hot.map(p => (
          <li key={p.id}>
            <Link to={`/community/${p.id}`} className="item">
              <strong>{p.title}</strong>
              <p>{p.snippet}</p>
              <span className="likes">❤️ {p.likes}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
