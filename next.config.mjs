/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ["cdn.sanity.io"],
    // },
    images: {
        domains: ["cdn.sanity.io", "images.pexels.com", "images.unsplash.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                pathname: "/**/*",
            },
            {
                protocol: "https",
                hostname: "images.pexels.com",
                pathname: "/**/*",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                pathname: "/**/*",
            },
        ],
    },
};

export default nextConfig;
