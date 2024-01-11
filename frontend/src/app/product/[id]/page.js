'use client'
import { useSearchParams } from 'next/navigation';

export default function Page({ params }) {
  //const router = useRouter();
  return (
    <div>
      <h1>Product Page</h1>
      <p>Product ID: {params.id}</p>
    </div>
  );
};