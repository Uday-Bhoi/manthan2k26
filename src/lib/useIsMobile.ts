'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect mobile devices for serving optimized video assets.
 * Uses both screen width and user agent for reliability.
 */
export function useIsMobile(breakpoint = 768): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const widthBased = window.innerWidth < breakpoint;
            const uaBased = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
                navigator.userAgent
            );
            setIsMobile(widthBased || uaBased);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [breakpoint]);

    return isMobile;
}
