import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
    return (
        <main className="wrapper flex flex-col items-center min-h-screen p-7 text-center">
            <div className="max-w-xs mb-12">
                <Image
                    src="/not_found-illustration.svg"
                    alt="Product Not Found"
                    className="w-full h-full object-contain object-center"
                />
            </div>
            <h1 className="text-[34px] font-semibold text-black mb-3">
                Oops! This product is not available.
            </h1>
            <p className="text-[16px] text-gray font-medium mb-7">
                The product you&apos;re looking for might have been removed or
                never existed.
            </p>
            <div className="flex flex-wrap gap-4">
                <Link
                    href="/"
                    className="bg-yellow  text-black rounded-full h-[64px] w-[245px] hover:bg-yellow/80 text-[18px] font-normal transition duration-100 flex items-center justify-center mx-auto"
                >
                    Go to Homepage
                </Link>
                <Link
                    href="/shop#products"
                    className="bg-transparent text-black text-[18px] hover:underline hover:underline-offset-8 transition duration-100 h-[64px] w-[245px] flex items-center justify-center mx-auto"
                >
                    View Other Products
                </Link>
            </div>
        </main>
    );
};

export default NotFound;
