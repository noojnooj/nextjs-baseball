'use client';
import { useRouter } from 'next/navigation';

export function Landing() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/start-scene');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center" onClick={handleClick}>
      <h1 className="text-3xl">아무곳이나 클릭</h1>
    </div>
  );
}