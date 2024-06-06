import dynamic from 'next/dynamic';
import MainLayout from '../components/MainLayout';

// 動態加載 P5Wrapper 並禁用 SSR
const P5Wrapper = dynamic(() => import('../components/P5Wrapper'), { ssr: false });

export default function Home() {
  return (
    <MainLayout>
      <h1>動畫演示</h1>
      <p>操作說明：</p>
      <ul>
        <li>按下 <b>'c'</b> 鍵可以改變粒子顏色。</li>
        <li>按下 <b>'s'</b> 鍵可以改變粒子速度。</li>
        <li>點擊滑鼠可以在點擊位置新增粒子。</li>
      </ul>
      <P5Wrapper />
    </MainLayout>
  );
}
