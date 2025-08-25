// src/pages/TestPage.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function TestPage() {   // ✅ 꼭 default export 있어야 함
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const runTest = async () => {
      try {
        // 1) 문서 추가
        await addDoc(collection(db, "test"), {
          message: "Hello Ladybug!",
          createdAt: new Date()
        });

        // 2) 전체 불러오기
        const snapshot = await getDocs(collection(db, "test"));
        setDocs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error("🔥 Firestore 테스트 에러:", err);
      }
    };
    runTest();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Firestore 연결 테스트</h2>
      <ul>
        {docs.map(d => (
          <li key={d.id}>
            {d.message} ({d.id})
          </li>
        ))}
      </ul>
    </div>
  );
}
