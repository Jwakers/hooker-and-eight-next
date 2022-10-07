import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
    return (
        <main>
            <section className="relative h-screen w-full">
                <video
                    autoPlay
                    className="absolute h-screen w-screen object-cover md:hidden"
                    muted
                >
                    <source
                        src="/assets/videos/hero-video-compressed.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute hidden h-screen w-screen md:block">
                    <Image
                        alt="Freshly cooked pizza"
                        layout="fill"
                        objectFit="cover"
                        src="/assets/images/hero-image.jpg"
                    />
                </div>
                <div className="relative flex h-screen w-screen items-center justify-center text-white">
                    <div className="text-center">
                        <div className="text-2xl">
                            Stunning handmade pizza at
                        </div>
                        <h1 className="mb-4 font-garamond text-5xl font-medium">
                            Hooker and Eight
                        </h1>
                        <div className="flex items-center justify-center gap-x-2">
                            <a className="btn">Menu</a>
                            <a className="btn">Table Reservation</a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
