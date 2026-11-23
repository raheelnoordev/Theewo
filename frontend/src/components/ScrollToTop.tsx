import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    __ewoSyncHeroVideo?: () => void;
    __ewoEnsureHeroPlaying?: () => void;
  }
}

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    window.__ewoSyncHeroVideo?.();
    if (pathname === '/' || pathname === '') {
      window.__ewoEnsureHeroPlaying?.();
    }
  }, [pathname]);

  return null;
}
