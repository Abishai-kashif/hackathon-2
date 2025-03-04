/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ["cdn.sanity.io"],
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                // port: "",
                pathname: "/**/*",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                // port: "",
                pathname: "/**/*",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                // port: "",
                pathname: "/**/*",
            },
        ],
    },
};

export default nextConfig;
