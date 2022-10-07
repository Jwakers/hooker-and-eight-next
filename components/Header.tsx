import { useState } from 'react';

import classNames, { Argument } from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import Content from '@/components/Content';

import MenuAndOrder from './MenuAndOrder';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="absolute z-10 w-full py-2 text-white lg:py-4">
            <Content className="flex items-center justify-between gap-6">
                <div className="relative w-52 md:w-80">
                    <Image
                        alt="Hooker and Eight text logo"
                        height={40}
                        layout="responsive"
                        src="/assets/images/text-logo.svg"
                        width={200}
                    />
                </div>
                <Navigation
                    className={classNames(
                        'clip-path-nav fixed top-0 right-0 flex h-screen w-auto flex-col gap-10 bg-red-600 py-14 pr-10 pl-20 text-right text-5xl font-medium text-white transition-transform duration-500 ease-in-out md:hidden',
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                />
                <Navigation className="hidden items-center gap-12 text-xl md:flex" />
                <Hamburger
                    menuOpen={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </Content>
        </header>
    );
};

const Navigation: React.FC<{ className: Argument }> = ({ className }) => (
    <nav className={classNames(className)}>
        <MenuAndOrder>
            <div>Menu and Order</div>
        </MenuAndOrder>
        <Link href="/find-us">
            <a className="">Find us</a>
        </Link>
        <Link href="/find-us">
            <a className="">About</a>
        </Link>
        <Link href="/find-us">
            <a className="">Gallery</a>
        </Link>
        <Link href="/find-us">
            <a className="">Openside</a>
        </Link>
    </nav>
);

const Hamburger: React.FC<{ onClick: () => void; menuOpen?: boolean }> = ({
    onClick,
    menuOpen,
}) => (
    <div
        className={classNames(
            'fixed bottom-8 flex h-16 w-16 translate-x-1/2 items-center justify-center rounded-full border-2 bg-red-600 transition-[right] duration-700 md:hidden',
            menuOpen ? 'right-16' : 'right-1/2'
        )}
        onClick={onClick}
    >
        <button aria-label="Open menu" className="relative h-[16px] w-[26px]">
            <div
                className={classNames(
                    'absolute h-0.5 w-full rounded-md bg-white transition-all delay-200 duration-300',
                    menuOpen ? 'top-1/2 rotate-45' : 'top-0 rotate-0'
                )}
            />
            <div
                className={classNames(
                    'absolute top-1/2 h-0.5 w-full rounded-md bg-white transition-opacity delay-200 duration-300',
                    menuOpen ? 'opacity-0' : 'opacity-100'
                )}
            />
            <div
                className={classNames(
                    'absolute h-0.5 w-full rounded-md bg-white transition-all delay-200 duration-300',
                    menuOpen ? 'top-1/2 -rotate-45' : 'top-full rotate-0'
                )}
            />
        </button>
    </div>
);

export default Header;
