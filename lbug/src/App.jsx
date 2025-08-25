// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
//커뮤니티
import Community from "./pages/Community";
import CommunityPost from "./pages/CommunityPost";

import TestPage from "./pages/TestPage";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        // App.jsx 일부
        <Route path="/seasons" element={<div>시즌 목록 페이지</div>} />
        <Route path="/seasons/:seasonId" element={<div>시즌 상세 페이지</div>} />
        <Route path="/episodes/latest" element={<div>최신 에피소드</div>} />
        <Route path="/characters" element={<div>캐릭터</div>} />
        <Route path="/community" element={<div>커뮤니티 목록</div>} />
        <Route path="/community/:postId" element={<div>게시글 상세</div>} />

        //커뮤니티
        <Route path="/community" element={<Community />} />
        <Route path="/community/:postId" element={<CommunityPost />} />


  <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
