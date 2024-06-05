// components/MainLayout.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function MainLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 你的 effect 處理邏輯
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}
