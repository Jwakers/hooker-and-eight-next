import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
    return (
        <main className="relative h-screen w-full">
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
        </main>
    );
};

export default Home;
