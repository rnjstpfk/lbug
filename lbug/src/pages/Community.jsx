// src/pages/Community.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  collection, addDoc, serverTimestamp, onSnapshot, query, orderBy
} from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";
import { signInAnonymously } from "firebase/auth"; // 👈 추가

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // 목록 구독
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.error("onSnapshot 에러:", err);
    });
    return () => unsub();
  }, []);

  // (임시) 익명 로그인 보조
  const ensureAuth = async () => {
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
    return auth.currentUser;
  };

  // 글 작성
  const onCreate = async (e) => {
    e?.preventDefault?.();
    const user = await ensureAuth();
    if (!user) return alert("로그인 실패");

    const docRef = await addDoc(collection(db, "posts"), {
      title,
      content,
      authorId: user.uid,
      authorName: user.isAnonymous ? "anonymous" : (user.displayName || user.email),
      likes: 0,
      likedBy: [],
      createdAt: serverTimestamp(),
    });
    setTitle(""); setContent("");
    navigate(`/community/${docRef.id}`);
  };

  // (임시) 씨앗 글 버튼
  const seedOne = async () => {
    setTitle("첫 글");
    setContent("안녕 레이디버그!");
    await onCreate();
  };

  return (
    <div className="container" style={{maxWidth:960, margin:"24px auto", padding:"0 16px"}}>
      <h2>Community</h2>

      {/* (임시) 씨앗 글 생성 버튼 */}
      <button onClick={seedOne}
        style={{margin:"8px 0 16px", padding:"8px 12px", border:0, borderRadius:8, background:"#eee"}}>
        씨앗 글 만들기 (테스트)
      </button>

      {/* 글쓰기 폼 */}
      <form onSubmit={onCreate} style={{display:"grid", gap:8, margin:"8px 0 24px"}}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="제목" required
               style={{padding:"10px 12px", borderRadius:8, border:"1px solid #ddd"}} />
        <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="내용" rows={4} required
                  style={{padding:"10px 12px", borderRadius:8, border:"1px solid #ddd"}} />
        <button type="submit" style={{padding:"10px 14px", border:0, borderRadius:8, background:"#ff4d6d", color:"#fff", fontWeight:700}}>
          글 작성
        </button>
      </form>

      {/* 목록 */}
      {posts.length === 0 ? (
        <div style={{color:"#777"}}>아직 글이 없어요. 위에서 글을 작성해보세요.</div>
      ) : (
        <ul style={{display:"grid", gap:12}}>
          {posts.map(p => (
            <li key={p.id} style={{border:"1px solid #eee", borderRadius:12, padding:12, background:"#fff"}}>
              <Link to={`/community/${p.id}`} style={{textDecoration:"none", color:"#111"}}>
                <strong>{p.title}</strong>
                <div style={{marginTop:6, color:"#666"}}>
                  {(p.content || "").slice(0,80)}{(p.content||"").length>80?"…":""}
                </div>
                <div style={{marginTop:8, fontSize:12, color:"#999"}}>
                  by {p.authorName || "Unknown"} · ❤️ {p.likes || 0}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
