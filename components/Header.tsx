import { RefObject, useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

import Content from '@/components/Content';

import MenuAndOrder from './MenuAndOrder';

const Header: React.FC<{ logoRef: RefObject<HTMLDivElement> }> = ({
    logoRef,
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="absolute z-10 w-full py-2 text-white lg:py-4">
            <Content className="flex items-center justify-between gap-6">
                <div className="relative w-60 md:w-80" ref={logoRef}>
                    <Image
                        alt="Hooker and Eight text logo"
                        height={40}
                        layout="responsive"
                        src="/assets/images/text-logo.svg"
                        width={200}
                    />
                </div>
                <SideMenu menuOpen={menuOpen} />
                <Navigation />
                <Hamburger
                    menuOpen={menuOpen}
                    onClick={() => setMenuOpen(!menuOpen)}
                />
            </Content>
        </header>
    );
};

const SideMenu: React.FC<{ menuOpen: boolean }> = ({ menuOpen }) => {
    const navlist = useRef<HTMLElement>(null);
    const menu = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline>();

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!navlist.current) return;
            tl.current = gsap
                .timeline()
                .from(navlist.current.children, {
                    opacity: 0,
                    duration: 0.3,
                    x: 20,
                    delay: 0.2,
                    stagger: 0.1,
                })
                .to(
                    menu.current,
                    {
                        filter: 'drop-shadow(-30px 0px 6px rgb(40 0 0 / 0.4))',
                    },
                    '<'
                );
        }, [navlist, menu]);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!tl.current) return;
        tl.current.reversed(!menuOpen);
    }, [menuOpen]);

    return (
        <>
            <div
                className={classNames(
                    'pointer-events-none fixed left-0 top-0 h-screen w-screen transition-all duration-300',
                    menuOpen
                        ? 'backdrop-blur-[2px] backdrop-grayscale-[0.4]'
                        : 'backdrop-blur-0 backdrop-grayscale-0'
                )}
            />
            <div className="fixed top-0 right-0" ref={menu}>
                <nav
                    className={classNames(
                        'clip-path-nav flex h-screen w-auto flex-col gap-10 bg-red-600 py-10 pr-10 pl-20 text-right text-3xl font-medium text-white transition-transform duration-500 ease-in-out md:hidden',
                        menuOpen ? 'translate-x-0' : 'translate-x-full'
                    )}
                    ref={navlist}
                >
                    <NavList />
                </nav>
            </div>
        </>
    );
};

const Navigation: React.FC = () => {
    const ref = useRef<HTMLElement>(null);
    const tl = useRef<gsap.core.Timeline>();

    useEffect(() => {
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline().from(ref.current?.children || [], {
                opacity: 0,
                duration: 0.3,
                y: 20,
                delay: 0.8,
                stagger: 0.1,
            });
        }, ref);

        return () => ctx.revert();
    }, []);

    return (
        <nav className="hidden items-center gap-12 text-xl md:flex" ref={ref}>
            <NavList />
        </nav>
    );
};

const NavList = () => (
    <>
        <MenuAndOrder>
            <div>Menu &amp; Order</div>
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
    </>
);

const Hamburger: React.FC<{ onClick: () => void; menuOpen?: boolean }> = ({
    onClick,
    menuOpen,
}) => (
    <div
        className={classNames(
            'fixed bottom-8 flex h-16 w-16 translate-x-1/2 items-center justify-center rounded-full border-2 transition-[right] duration-700 md:hidden',
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
