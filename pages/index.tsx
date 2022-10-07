import { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { NextPage } from 'next';
import Image from 'next/image';

import Content from '@/components/Content';
import Header from '@/components/Header';
import MenuAndOrder from '@/components/MenuAndOrder';

gsap.registerPlugin(ScrollTrigger);

const Home: NextPage = () => {
    const hero = useRef<HTMLDivElement>(null);
    const heroText = useRef<HTMLDivElement>(null);
    const logo = useRef(null);
    const title = useRef<HTMLHeadingElement>(null);
    const subTitle = useRef<HTMLDivElement>(null);
    const buttons = useRef<HTMLDivElement>(null);
    const scroll = useRef<HTMLDivElement>(null);
    const scrollWrap = useRef<HTMLDivElement>(null);

    const [heroHeight, setHeroHeight] = useState<number | string>('auto');

    useEffect(() => {
        setHeroHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to([heroText.current, scrollWrap.current], {
                scrollTrigger: {
                    scrub: true,
                },
                y: (_, target) => -200 * target.dataset.speed,
                ease: 'none',
            });

            gsap.timeline()
                .from(logo.current, {
                    y: 100,
                    clipPath: 'inset(100% 100% 0% 0%)',
                    duration: 1,
                })
                .from(title.current, {
                    opacity: 0,
                    y: 20,
                    delay: 0.6,
                })
                .from(subTitle.current, {
                    opacity: 0,
                    y: 30,
                    delay: -0.3,
                })
                .from(buttons.current?.children || [], {
                    stagger: 0.1,
                    y: 10,
                    scale: 0.8,
                    delay: -0.3,
                    opacity: 0,
                })
                .from(scroll.current, {
                    duration: 1,
                    ease: 'power2.out',
                    clipPath: 'inset(0% 0% 100% 0%)',
                    delay: 1,
                });
        }, [heroText, scrollWrap, logo, title, subTitle, buttons, scroll]);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Header logoRef={logo} />
            <main>
                <section
                    className="relative h-screen w-full"
                    ref={hero}
                    style={{
                        height: heroHeight,
                    }}
                >
                    <video
                        autoPlay
                        className="absolute h-full w-full object-cover md:hidden"
                        muted
                    >
                        <source
                            src="/assets/videos/hero-video-compressed.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute hidden h-full w-full md:block">
                        <Image
                            alt="Freshly cooked pizza"
                            layout="fill"
                            objectFit="cover"
                            src="/assets/images/hero-image.jpg"
                        />
                    </div>
                    <div
                        className="relative flex h-full w-full items-center justify-center text-white"
                        data-speed={0.2}
                        ref={heroText}
                    >
                        <Content className="text-center">
                            <div className="text-2xl" ref={title}>
                                Stunning handmade pizza at
                            </div>
                            <h1
                                className="mb-4 font-garamond text-5xl font-medium"
                                ref={subTitle}
                            >
                                Hooker and Eight
                            </h1>
                            <div
                                className="flex items-center justify-center gap-x-2"
                                ref={buttons}
                            >
                                <MenuAndOrder>
                                    <button className="btn">
                                        Menu &amp; Order
                                    </button>
                                </MenuAndOrder>
                                <span
                                    data-glf-cuid="4fb0fb85-1362-4f6e-92b9-705b22814f18"
                                    data-glf-reservation="true"
                                    data-glf-ruid="f7220aa7-9342-4482-a162-2664ecf3b30f"
                                >
                                    <button className="btn">
                                        Table Reservation
                                    </button>
                                </span>
                            </div>
                        </Content>
                    </div>
                    <Content className="relative">
                        <div data-speed={0.1} ref={scrollWrap}>
                            <div
                                className="absolute -top-8 left-0 -translate-y-full overflow-hidden text-sm text-white"
                                ref={scroll}
                            >
                                <div className="flex h-full flex-col items-center gap-4">
                                    <span className="h-40 w-px grow border-r border-white" />
                                    <span className="writing-mode-vrl">
                                        scroll
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Content>
                </section>
                <div className="pb-96">text</div>
            </main>
        </>
    );
};

export default Home;
