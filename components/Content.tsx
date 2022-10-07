import React from 'react';

import classNames, { Argument } from 'classnames';

const Content = ({
    children,
    className = '',
}: React.PropsWithChildren<{ className?: Argument }>) => (
    <section
        className={classNames(
            'mx-auto w-[clamp(1vw,_100%_-_40px,_80rem)]',
            className
        )}
    >
        {children}
    </section>
);

export default Content;
