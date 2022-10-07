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
                            <span
                                data-glf-cuid="4fb0fb85-1362-4f6e-92b9-705b22814f18"
                                data-glf-ruid="f7220aa7-9342-4482-a162-2664ecf3b30f"
                                id="glfButton1"
                            >
                                <button className="btn">
                                    Menu &amp; Order
                                </button>
                            </span>
                            <span
                                data-glf-cuid="4fb0fb85-1362-4f6e-92b9-705b22814f18"
                                data-glf-reservation="true"
                                data-glf-ruid="f7220aa7-9342-4482-a162-2664ecf3b30f"
                                id="glfButton2"
                            >
                                <button className="btn">
                                    Table Reservation
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
