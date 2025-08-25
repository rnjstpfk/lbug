// src/pages/Home.jsx
import HeroSlider from '../components/HeroSlider';
import QuickActions from '../components/QuickActions';
import SeasonNavigator from '../components/SeasonNavigator';
import CommunityHighlights from '../components/CommunityHighlights';

export default function Home() {
  return (
    <div className="home">
      <HeroSlider />
      <div className="container">
        <QuickActions />
        <SeasonNavigator />
        <CommunityHighlights />
      </div>
    </div>
  );
}
