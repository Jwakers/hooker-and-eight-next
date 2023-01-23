import { useEffect, useState } from 'react';

const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState<boolean>(false);

    const checkMatch = () => {
        if (window.matchMedia('(min-width: 768px)').matches) {
            return setIsDesktop(true);
        }
        return setIsDesktop(false);
    };

    useEffect(() => {
        window.addEventListener('resize', checkMatch);
        checkMatch();
    }, []);

    return isDesktop;
};

export default useIsDesktop;
