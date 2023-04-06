import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';

import Content from '@/components/Content';
import Header from '@/components/Header';
import MenuAndOrder from '@/components/MenuAndOrder';
import useIsDesktop from '@/hooks/useIsDesktop';

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
                    className="relative h-screen min-h-[400px] w-full"
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
                        data-speed={1}
                        ref={heroText}
                    >
                        <Content className="text-center">
                            <div className="text-2xl" ref={title}>
                                Stunning handmade pizza at
                            </div>
                            <h1
                                className="mb-4 font-galasio text-5xl"
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
                        <div data-speed={0.4} ref={scrollWrap}>
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
                <section className="bg-gray-900 py-14">
                    <ContentBlock
                        imageUrl="https://res.cloudinary.com/drgquplia/image/upload/v1615569237/hooker-and-eight/gallery/pizza-ready-for-the-oven.jpg"
                        text="From our slow-cooked sauce, to our home made meatballs using Nonna Balzano's secret recipe. Hooker & Eight takes serious pride in everything that goes onto our dough and are proud that the vast majority of our ingredients are sourced from local Gloucestershire businesses."
                        title="All fresh, all handmade"
                    />
                    <div className="my-12" />
                    <ContentBlock
                        imageUrl="https://res.cloudinary.com/drgquplia/image/upload/v1615569237/hooker-and-eight/gallery/vegetable-ingredients.jpg"
                        reverse
                        text="We have some of the best vegan and vegetarian options you'll find in Gloucetershire! Almost all of our pizzas can be veganized. Using faux meats, vegan pestos and our freshly made almond ricotta. No matter what your taste, we've got you covered."
                        title="Vegetarian & vegan options"
                    />
                </section>
                <ReviewsSection />
                <AboutSection />
            </main>
        </>
    );
};

const ContentBlock: React.FC<{
    reverse?: boolean;
    title: string;
    text: string;
    imageUrl: string;
}> = ({ reverse, title, text, imageUrl }) => {
    const content = useRef<HTMLDivElement>(null);
    const svgPath = useRef<SVGPathElement>(null);
    const svgPathLength = 1000;

    useEffect(() => {
        gsap.fromTo(
            svgPath.current,
            {
                strokeDasharray: svgPathLength,
                strokeDashoffset: svgPathLength,
            },
            {
                scrollTrigger: {
                    trigger: content.current,
                    start: 'bottom bottom',
                    end: 'bottom 50%',
                },
                strokeDashoffset: 0,
                duration: 2,
            }
        );

        gsap.to(content.current, {
            scrollTrigger: {
                trigger: content.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
            y: (_, target) => -200 * target.dataset.speed,
            ease: 'none',
        });
    }, []);

    return (
        <Content>
            <div
                className={classNames(
                    'mx-auto max-w-4xl items-center text-white md:flex md:gap-6',
                    reverse && 'md:ml-auto md:flex-row-reverse'
                )}
            >
                <div
                    className="relative z-10 p-6"
                    data-speed={0.2}
                    ref={content}
                >
                    <h2 className="mb-4 font-galasio text-5xl">{title}</h2>
                    <p>{text}</p>
                    <svg
                        className="absolute top-0 left-0 ml-[1px] stroke-white lg:ml-0"
                        fill="none"
                        height="100%"
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                        width="100%"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 0h100v100H0Z"
                            fill="none"
                            pathLength={svgPathLength}
                            ref={svgPath}
                            strokeWidth="1"
                        />
                    </svg>
                </div>
                <div
                    className={classNames(
                        'relative h-[200px] w-full flex-[0_0_auto] md:h-[400px] md:w-[400px]',
                        reverse
                            ? 'md:[clip-path:_circle(100%_at_top_right)]'
                            : 'md:[clip-path:_circle(100%_at_bottom_left)]'
                    )}
                >
                    <Image
                        alt=""
                        height={200}
                        layout="fill"
                        objectFit="cover"
                        src={imageUrl}
                        width={700}
                    />
                </div>
            </div>
        </Content>
    );
};

const ReviewsSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const isDesktop = useIsDesktop();

    gsap.from(ref.current, {
        scrollTrigger: {
            scrub: true,
        },
        y: isDesktop ? -100 : 100,
    });

    return (
        <section className="bg-orange-600 py-14 text-white">
            <Content className="grid-cols-2 gap-x-8 md:grid">
                <div className="mb-4 md:ml-auto md:mb-0 md:max-w-xs md:text-right">
                    <div className="font-galasio font-medium opacity-60">
                        Trip advisor
                    </div>
                    <h3 className="mb-4 font-galasio text-4xl">
                        Don&apos;t just take our word for it
                    </h3>
                    <p className="mb-4">
                        Sed eget consequat neque. Ut pulvinar tortor eget dolor
                        fringilla, ac varius tellus luctus. Morbi sed dolor
                        bibendum, accumsan odio in, posuere neque.
                    </p>
                    <Link
                        href="https://www.tripadvisor.co.uk/Restaurant_Review-g187047-d19141578-Reviews-Hooker_Eight-Gloucester_Cotswolds_England.html"
                        target="_blank"
                    >
                        <a className="btn">Find us on trip advisor</a>
                    </Link>
                </div>
                <div>
                    <Script
                        async
                        src="https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=748&amp;locationId=19141578&amp;lang=en_UK&amp;rating=true&amp;nreviews=4&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=true&amp;border=false&amp;display_version=2"
                    ></Script>
                    <div className="overflow-hidden rounded" ref={ref}>
                        <div
                            className={`TA_selfserveprop`}
                            id="TA_selfserveprop748"
                        >
                            <ul
                                className="TA_links O3DeLF1BMrf1"
                                id="CEkFmKrMfu1"
                            >
                                <li className="8ASPMz2bzQ" id="VeTaib">
                                    <a
                                        href="https://www.tripadvisor.co.uk/Restaurant_Review-g187047-d19141578-Reviews-Hooker_Eight-Gloucester_Cotswolds_England.html"
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        <img
                                            alt="TripAdvisor"
                                            src="https://www.tripadvisor.co.uk/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Content>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section className="bg-red-500 py-4">
            <Content className="grid-cols-2 md:grid">
                <div className="p-4">
                    <div className="ml-auto max-w-sm">
                        <Image
                            alt="Hooker and Eight logo"
                            height={382}
                            src="/assets/images/logo.png"
                            width={330}
                        />
                    </div>
                </div>
                <div className="flex pl-4 text-white md:border-l-2 md:border-l-white">
                    <div className="my-auto">
                        <div className="font-galasio font-medium opacity-60">
                            Our story
                        </div>
                        <h3 className="mb-4 font-galasio text-4xl">
                            Where it all began
                        </h3>
                        <p className="mb-4">
                            Dan and Balz are childhood school friends who played
                            local youth rugby together for many years...
                        </p>
                        <Link href="/about">
                            <a className="btn">Read the whole story</a>
                        </Link>
                    </div>
                </div>
            </Content>
        </section>
    );
};

export default Home;
