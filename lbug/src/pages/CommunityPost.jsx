import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  doc, onSnapshot, updateDoc, collection, addDoc,
  serverTimestamp, arrayUnion, arrayRemove
} from "firebase/firestore";
import { auth } from "../firebase";
import { db } from "../firebase";

export default function CommunityPost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const user = auth.currentUser;
  const uid = user?.uid;

  useEffect(() => {
    const ref = doc(db, "posts", postId);
    const unsub = onSnapshot(ref, (snap) => setPost({ id: snap.id, ...snap.data() }));
    const unsubC = onSnapshot(collection(db, "posts", postId, "comments"), (snap) => {
      const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        .sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
      setComments(arr);
    });
    return () => { unsub(); unsubC(); };
  }, [postId]);

  const liked = useMemo(() => !!post?.likedBy?.includes(uid), [post, uid]);

  const toggleLike = async () => {
    if (!uid) return alert("로그인 후 이용해주세요.");
    const ref = doc(db, "posts", postId);
    if (liked) {
      await updateDoc(ref, { likes: (post.likes || 0) - 1, likedBy: arrayRemove(uid) });
    } else {
      await updateDoc(ref, { likes: (post.likes || 0) + 1, likedBy: arrayUnion(uid) });
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!uid) return alert("로그인 후 댓글을 작성할 수 있어요.");
    if (!comment.trim()) return;

    await addDoc(collection(db, "posts", postId, "comments"), {
      content: comment.trim(),
      authorId: uid,
      authorName: user.displayName || user.email,
      createdAt: serverTimestamp(),
    });
    setComment("");
  };

  if (!post) return <div className="container" style={{maxWidth:860, margin:"24px auto"}}>Loading…</div>;

  return (
    <div className="container" style={{maxWidth:860, margin:"24px auto", padding:"0 16px"}}>
      <h2 style={{marginBottom:8}}>{post.title}</h2>
      <div style={{color:"#777", fontSize:14, marginBottom:16}}>by {post.authorName || "Unknown"}</div>

      <div style={{whiteSpace:"pre-wrap", lineHeight:1.6, background:"#fff", border:"1px solid #eee", borderRadius:12, padding:16}}>
        {post.content}
      </div>

      <button onClick={toggleLike}
        style={{marginTop:12, padding:"8px 12px", border:0, borderRadius:8, background: liked ? "#222" : "#ff4d6d", color:"#fff", fontWeight:700}}>
        {liked ? "❤️ Liked" : "♡ Like"} ({post.likes || 0})
      </button>

      <hr style={{margin:"24px 0"}}/>

      <h3>Comments</h3>
      <form onSubmit={addComment} style={{display:"grid", gap:8, margin:"12px 0 20px"}}>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3} placeholder="댓글을 입력하세요"
                  style={{padding:"10px 12px", borderRadius:8, border:"1px solid #ddd"}} />
        <button type="submit" style={{padding:"8px 12px", border:0, borderRadius:8, background:"#111", color:"#fff", fontWeight:700}}>
          댓글 작성
        </button>
      </form>

      <ul style={{display:"grid", gap:10}}>
        {comments.map(c => (
          <li key={c.id} style={{border:"1px solid #eee", borderRadius:10, background:"#fff", padding:12}}>
            <div style={{fontWeight:700, fontSize:14}}>{c.authorName || "Anonymous"}</div>
            <div style={{color:"#444", marginTop:6, whiteSpace:"pre-wrap"}}>{c.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
