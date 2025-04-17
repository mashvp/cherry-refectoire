'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function useGTMProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'pageview',
        page: pathname,
      });
    }
  }, [pathname]);

}