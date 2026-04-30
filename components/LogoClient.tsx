'use client';

import dynamic from 'next/dynamic';
import PulseSpinner from '@/components/PulseSpiner';
import { useState } from 'react';

const Logo = dynamic(() => import('@/components/Logo'), { ssr: false });

export default function LogoClient(props: React.ComponentProps<typeof Logo>) {
  const [ready, setReady] = useState(false);

  return (
    <div style={{ width: props.width ?? 300, height: props.height ?? 300, position: 'relative' }}>
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <PulseSpinner size={props.height / 4} color="#fff" />
        </div>
      )}
      <Logo {...props} onLoad={() => setReady(true)} />
    </div>
  );
}
