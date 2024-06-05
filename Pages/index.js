import dynamic from 'next/dynamic';
import MainLayout from '../components/MainLayout';

// 動態加載 P5Wrapper 並禁用 SSR
const P5Wrapper = dynamic(() => import('../components/P5Wrapper'), { ssr: false });

export default function Home() {
  return (
    <MainLayout>
      <h1>asdd!</h1>
      <P5Wrapper />
    </MainLayout>
  );
}
