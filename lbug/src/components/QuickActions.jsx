// src/components/QuickActions.jsx
import { Link } from 'react-router-dom';
import './QuickActions.scss';

export default function QuickActions() {
  const items = [
    { to:'/seasons', label:'All Seasons' },
    { to:'/episodes/latest', label:'Latest Episodes' },
    { to:'/characters', label:'Characters' },
    { to:'/community', label:'Community' },
  ];
  return (
    <div className="quick-actions">
      {items.map(i => (
        <Link key={i.to} to={i.to} className="pill">{i.label}</Link>
      ))}
    </div>
  );
}
