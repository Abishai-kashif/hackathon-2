import Link from "next/link";
import Image from "next/image";

function Hero() {
    return (
        <section className="wrapper min-h-screen lg:h-[122vh]  bg-yellow text-black  flex flex-col  lg:flex-row items-center justify-between overflow-hidden">
            {/* text */}
            <div className="flex flex-col gap-[35px] lg:ml-auto relative lg:left-16 sm:pl-10 pl-4 pr-4 sm:pr-0 mt-20">
                <h1 className="lg:max-w-[440px] text-[46px] sm:text-[64px] font-medium">
                    Rocket single seater
                </h1>

                <Link
                    href="/shop"
                    className="underline underline-offset-[18px] decoration-2 text-[18px] sm:text-[24px] font-medium"
                >
                    Shop Now
                </Link>
            </div>

            {/* image */}
            <div className="lg:h-[1000px] lg:w-[840px]">
                <Image
                    src="/home/hero-image.png"
                    alt="hero"
                    height={1000}
                    width={840}
                    priority
                    className="object-contain object-center h-full w-full z-[-1] mx-auto"
                />
            </div>
        </section>
    );
}

export default Hero;
