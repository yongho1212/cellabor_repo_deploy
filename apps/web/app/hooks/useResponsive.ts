import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
    const [isClient, setIsClient] = useState(false);
    const isMobileQuery = useMediaQuery({ maxWidth: 480 });

    useEffect(() => {
        setIsClient(true);
    }, []);

    return {
        isMobile: isClient ? isMobileQuery : false,
    };
};
