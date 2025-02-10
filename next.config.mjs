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
        ],
    },
};

export default nextConfig;
